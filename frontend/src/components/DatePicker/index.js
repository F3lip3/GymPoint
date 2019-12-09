import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, onChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      }
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleDatePickerChange(date) {
    setSelected(date);
    onChange(date);
  }

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        dateFormat="dd/MM/yyyy"
        onChange={date => handleDatePickerChange(date)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

DatePicker.defaultProps = {
  onChange: null
};
