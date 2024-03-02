import React, { createContext, useEffect, useState } from 'react';
import { Axios } from '../../config/config';
import { useQuery, useQueryClient } from 'react-query';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import LoadingPromise from '../LoadingPromise';

const initialState = {
  _id: '',
  items: [],
  userInfo: {
    firstName: '',
    lastName: '',
    email: '',
    profileImg: '',
    profileImgTemp: null,
    profileBlob: '',
    enable_color_customization: false,
  },
  userAuditLogs: [],
  profileInfo: {
    email: '',
    firstLogin: false,
    _id: '',
    userAuditLogs: [],
    isPaidTier: false,
    avatar: null,
  },
};

export const APIContext = createContext({
  serverData: initialState,
  dataLoaded: false,
  updateContextState: () => {},
});



export function APIContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const authUser = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const queryClient = useQueryClient();

  const { data: queryData, isLoading, isError } = useQuery(
    ['userInfo', 'devLinks'],
    async () => {
      const [userInfoResponse, devLinksResponse] = await Promise.all([
        Axios.post('/api/getuserinfo'),
        Axios.post('/api/getdevlinks'),
      ]);

      const userInfo = userInfoResponse.data.userInfo;
      const userAuditLog = userInfoResponse.data.userAuditLog;
      const devLinks = devLinksResponse.data.allDevLinks;

      if (devLinks != null && userInfo != null) {
        return {
          _id: devLinks[0]._id || '',
          items: devLinks[0].items || [],
          userInfo: {
            firstName: devLinks[0].name || '',
            lastName: devLinks[0].last_name || '',
            email: devLinks[0].email || '',
            profileImg: devLinks[0].profile_picture || '',
            profileBlob: '', // used for the blob temp
            profileImgTemp: null,
            enable_color_customization: devLinks[0].enable_color_customization || false,
          },
          userAuditLogs: userAuditLog,
          profileInfo: {
            ...initialState.profileInfo,
            ...userInfo,
          },
        };
      } else {
        throw new Error('Data not available');
      }
    },
    {
      enabled: isAuthenticated(),
      refetchOnWindowFocus: false,
    }
  );


  const updateContextState = (newState) => {
    setServerData((prev) => ({ ...prev, ...newState }));
  };

  const setServerData = (newServerData) => {
    queryClient.setQueryData(['userInfo', 'devLinks'], newServerData);
  };

  if (!isAuthenticated()) {
    return (
      <APIContext.Provider value={{ serverData: initialState, dataLoaded: false, updateContextState }}>
        {children}
      </APIContext.Provider>
    );
  }

  if (isLoading) {
    return <LoadingPromise />;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <APIContext.Provider value={{ serverData: queryData || initialState, dataLoaded: true, updateContextState }}>
      {children}
    </APIContext.Provider>
  );
}