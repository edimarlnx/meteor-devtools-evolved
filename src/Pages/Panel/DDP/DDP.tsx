import React, { FunctionComponent } from 'react';
import { PanelStoreConstructor } from '../../../Stores/PanelStore';
import { flow } from 'lodash/fp';
import { inject, observer } from 'mobx-react';
import { DDPLogLine } from './DDPLogLine';
import { Button, Classes, Icon, Tag } from '@blueprintjs/core';

interface Props {
  panelStore?: PanelStoreConstructor;
}

const Empty: FunctionComponent = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <span className={Classes.TEXT_MUTED}>
      No logs yet... <Icon icon='comment' />
    </span>
  </div>
);

export const DDP: FunctionComponent<Props> = flow(
  observer,
  inject('panelStore'),
)(({ panelStore }) => {
  const logs = panelStore?.ddp.map(message => (
    <DDPLogLine store={panelStore} message={message} key={message.timestamp} />
  ));

  return (
    <>
      <div className='mde-ddp'>{logs?.length ? logs : <Empty />}</div>

      <div className='mde-layout__status'>
        <Tag intent='primary' minimal round>
          {panelStore?.ddpCount}
        </Tag>

        <Button
          intent='danger'
          minimal
          style={{ marginLeft: 10 }}
          onClick={() => {
            panelStore?.clearLogs();
          }}
        >
          <Icon icon='disable' />
        </Button>
      </div>
    </>
  );
});
