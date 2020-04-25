import { PanelStoreConstructor } from '@/Stores/PanelStore';
import { Icon, IconName, Tag, Tooltip } from '@blueprintjs/core';
import React, { FunctionComponent } from 'react';

interface Props {
  log: DDPLog;
  store: PanelStoreConstructor;
}

const getTag = (icon: IconName, title: string) => (
  <Tooltip
    content={title}
    hoverOpenDelay={800}
    position='top'
    className='content-icon'
  >
    <Icon
      icon={icon}
      style={{
        color: '#8a9ba8',
      }}
      iconSize={14}
    />
  </Tooltip>
);

const getTypeTag = (filterType?: FilterType | null) => {
  switch (filterType) {
    case 'heartbeat':
      return getTag('heart', 'Heartbeat');
    case 'connection':
      return getTag('globe-network', 'Connection');
    case 'collection':
      return getTag('database', 'Collection');
    case 'subscription':
      return getTag('feed-subscribed', 'Subscription');
    case 'method':
      return getTag('derive-column', 'Method');
    default:
      return getTag('warning-sign', 'Unknown');
  }
};

export const DDPLogPreview: FunctionComponent<Props> = ({ log, store }) => {
  return (
    <>
      {getTypeTag(log.filterType)}
      <Tag
        interactive
        minimal
        onClick={() => {
          log.parsedContent && store.setActiveObject(log.parsedContent);
        }}
        className='content-preview'
      >
        <small>
          <code>{log.preview}</code>
        </small>
      </Tag>
    </>
  );
};
