
const cron = require('node-cron');
const { User, DevLinks, AuditLog, Settings, GlobalResets } = require('../models/dbSchema.cjs');

const resetAfterOneMonthCronJob = async () => {
    const setting = await Settings.findOne();
    if (setting.enableResetUsersOneMonthCronJob === true || null || undefined) {
        cron.schedule('0 0 1 * *', async () => { // Run on the first day of every month
            try {
                const currentDate = new Date();
                const futureDate = new Date(currentDate);
                // Calculate the date one month ago
                const dateOneMonthAgo = new Date();
                dateOneMonthAgo.setMonth(dateOneMonthAgo.getMonth() - 1);

                // Find users with a lastReset date over one month ago
                const usersToReset = await User.find({
                    $or: [
                        { lastReset: { $lt: dateOneMonthAgo } }
                    ]
                });

                // Reset devLinks for users to reset
                usersToReset.forEach(async (user) => {
                    const devLinksToReset = await DevLinks.find({ _id: { $in: user.devLinks } });

                    devLinksToReset.forEach(async (devLink) => {
                        devLink.items = [];
                        await devLink.save();
                    });

                    // Update lastReset to the current date
                    user.lastReset = currentDate;
                    await user.save();

                });
                const resetLog = new GlobalResets({
                    note: `${usersToReset.length} users has been resetted successfully next planned reset at ${futureDate.setMonth(currentDate.getMonth() + 1)}`
                });
                await resetLog.save();
                console.log(`${usersToReset.length} users reset successfully.`);
            } catch (error) {
                console.error('Error in cron job:', error);
            }
        });
    }
};

module.exports = { resetAfterOneMonthCronJob };