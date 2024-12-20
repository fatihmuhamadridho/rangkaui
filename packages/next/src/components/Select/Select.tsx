import React, { useEffect, useMemo, useRef, useState } from 'react';
import classes from './Select.module.css';

interface SelectProps {
  label?: string;
  placeholder?: string;
  data?: string[] | Array<{ label: string; value: string }>;
  name?: string;
  onChange?: (...props: any) => any;
  value?: string;
}

const Select = (props: SelectProps) => {
  const { label, placeholder, data, name, onChange, value } = props;
  const defaultTop = 34;
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string>(value || '');
  const selectRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        handleHide();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value !== undefined && value !== result) {
      setResult(value);
    }
  }, [value, result]);

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  const renderData: Array<{ label: string; value: string }> = useMemo(() => {
    if (!data) {
      return [];
    }

    const uniqueValues = new Set<string>();
    const isDataString = data.every((item) => typeof item === 'string');
    const isDataObject = data.every((item) => typeof item === 'object' && item !== null);

    const hasMixedTypes = data.some(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        !Object.hasOwn(item, 'label') &&
        Object.hasOwn(item, 'value')
    );

    if (hasMixedTypes || (!isDataString && !isDataObject)) {
      setError('Error: Data contains invalid types or mixed types.');
      return [];
    }

    const processData = (items: Array<{ label: string; value: string }>) => {
      const hasDuplicate = items.some(({ value }) => {
        if (uniqueValues.has(value)) {
          return true;
        } else {
          uniqueValues.add(value);
          return false;
        }
      });

      if (hasDuplicate) {
        setError('Error: Duplicate values found in data.');
        return [];
      } else {
        setError(null);
        return items;
      }
    };

    if (isDataString && !isDataObject) {
      return processData(data.map((item) => ({ label: item, value: item })));
    } else if (isDataObject) {
      return processData(data as Array<{ label: string; value: string }>);
    } else {
      return [];
    }
  }, [data]);

  const renderValue = useMemo(() => {
    const findData = renderData?.find((item) => item?.value === result);
    return findData ? findData.label : '';
  }, [result, renderData]);

  const hanadleSelectItem = (event: string) => {
    setShow(false);
    if (event === result) setResult('');
    if (event !== result) setResult(event);
    if (onChange) {
      if (event === result) onChange({ target: { name: name || '', value: '' } });
      if (event !== result) onChange({ target: { name: name || '', value: event } });
    }
  };

  return (
    <div ref={selectRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>{label}</div>
        <input
          name={name}
          className={classes['rangkaui-select-input']}
          placeholder={placeholder}
          value={renderValue || ''}
          onFocus={handleShow}
          onChange={() => {}}
        />
      </div>
      {show && (
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: 4,
            padding: 4,
            position: 'absolute',
            top: defaultTop + 6,
            width: '100%',
            zIndex: 300,
          }}
        >
          {error ? (
            <div style={{ color: 'red', padding: 8 }}>{error}</div>
          ) : renderData.length > 0 ? (
            renderData?.map((item) => (
              <React.Fragment key={item.value}>
                <div
                  className={classes.optionSelect}
                  style={{ cursor: 'pointer', padding: '4px 8px' }}
                  onClick={() => hanadleSelectItem(item.value)}
                >
                  {item.label}
                </div>
              </React.Fragment>
            ))
          ) : (
            <React.Fragment>
              <div style={{ minHeight: 40, padding: '4px 8px' }}></div>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
