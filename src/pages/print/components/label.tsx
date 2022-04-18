import React, { FC, useEffect } from 'react';

interface Props {
  onRendered: any;
}

/* 发货面单样式 */
const Label: FC<Props> = (props: Props) => {
  useEffect(() => {
    props.onRendered();
  }, []);

  return <div className="label">打印样式</div>;
};

export default Label;
