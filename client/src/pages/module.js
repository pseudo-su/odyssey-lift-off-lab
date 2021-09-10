import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Layout, QueryResult } from '../components';
import ModuleDetail from '../components/module-detail';

const GET_MODULE_DETAIL = gql`
  query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;

const Module = ({ trackId, moduleId }) => {
  const { error, data, loading } = useQuery(GET_MODULE_DETAIL, {
    variables: {
      trackId,
      moduleId,
    },
  });
  return <Layout fullWidth>
    <QueryResult error={error} loading={loading} data={data}>
      <ModuleDetail track={data?.track} module={data?.module} />
    </QueryResult>
  </Layout>;
};

export default Module;
