import React, { FC } from 'react';
import { Select } from 'antd';
import { PrinterList } from '../type';

const { Option } = Select;
interface Props {
  printers: PrinterList;
}
/* 选择打印机 */
const Printer: FC<Props> = (props: Props) => {
  const { printers } = props;

  const selectPrinter = p => {
    localStorage.printer = p;
  };

  const defaultPrinter = localStorage.printer || '';
  const options = printers.map(printer => {
    return (
      <Option key={printer.name} value={printer.name}>
        {printer.label}
      </Option>
    );
  });
  return (
    <Select defaultValue={defaultPrinter} style={{ width: '100%' }} onChange={selectPrinter}>
      {options}
    </Select>
  );
};

export default Printer;
