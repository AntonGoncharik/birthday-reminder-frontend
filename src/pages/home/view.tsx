import React, { FC } from 'react';
import { Calendar, Col, Row, Select } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';

import { Home } from './interface';
import { Man } from '../../interfaces';
import { Splash } from '../../components';

const getListData = (value: Moment, people: Man[]) => {
  return people
    .map((item) => {
      return { ...item, birthDate: moment(+item.birthDate) };
    })
    .filter((item) => {
      return (
        item.birthDate.date() === value.date() &&
        item.birthDate.month() === value.month()
      );
    })
    .map((item) => {
      const years = value.diff(item.birthDate, 'years');

      return `${item.lastName} ${item.firstName} ${years} years!`;
    });
};

const View: FC<Home> = (props) => {
  const { loading, people } = props;

  if (loading) {
    return <Splash widthHeader />;
  }

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value, people);

    return (
      <ul style={{ overflow: 'auto', padding: 0 }}>
        {listData.map((item) => {
          return (
            <div key={item}>
              <span>{item}</span>
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <Calendar
      dateCellRender={dateCellRender}
      headerRender={({ value, onChange }) => {
        const start = 0;
        const end = 12;
        const monthOptions = [];

        const current = value.clone();
        const localeData = value.localeData();
        const months = [];
        for (let i = 0; i < 12; i++) {
          current.month(i);
          months.push(localeData.monthsShort(current));
        }

        for (let index = start; index < end; index++) {
          monthOptions.push(
            <Select.Option className="month-item" key={`${index}`}>
              {months[index]}
            </Select.Option>,
          );
        }
        const month = value.month();

        const year = value.year();
        const options = [];
        for (let i = year - 10; i < year + 10; i += 1) {
          options.push(
            <Select.Option key={i} value={i} className="year-item">
              {i}
            </Select.Option>,
          );
        }
        return (
          <div style={{ padding: 8 }}>
            <Row gutter={8} style={{ justifyContent: 'flex-end' }}>
              <Col>
                <Select
                  dropdownMatchSelectWidth={false}
                  className="my-year-select"
                  onChange={(newYear) => {
                    const now = value.clone().year(Number(newYear));
                    onChange(now);
                  }}
                  value={String(year)}
                >
                  {options}
                </Select>
              </Col>
              <Col>
                <Select
                  dropdownMatchSelectWidth={false}
                  value={String(month)}
                  onChange={(selectedMonth) => {
                    const newValue = value.clone();
                    newValue.month(parseInt(selectedMonth, 10));
                    onChange(newValue);
                  }}
                >
                  {monthOptions}
                </Select>
              </Col>
            </Row>
          </div>
        );
      }}
    />
  );
};

export default View;
