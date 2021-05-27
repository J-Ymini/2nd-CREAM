import React, { useState } from 'react';
import styled from 'styled-components';

export default function TypeBox(props) {
  const [dropDown, setDropDown] = useState('');
  const { filterData } = props;

  const dropDownButton = e => {
    setDropDown(!dropDown);
  };

  return (
    <TypeBoxStyle>
      <div>
        <FilterTitle>{filterData.filtertype[1]}</FilterTitle>
        {dropDown ? (
          filterData.idAndName.map(idAndName => {
            return (
              <TypeList key={Object.keys(idAndName)}>
                <TypeListLabel>
                  <TypeListCheckBox
                    type="checkbox"
                    name={Object.keys(idAndName)}
                    onChange={e =>
                      props.setBrandFilter(e, filterData.filtertype[0])
                    }
                  />
                  {Object.values(idAndName)}
                </TypeListLabel>
              </TypeList>
            );
          })
        ) : (
          <Alltype>{`모든 ${filterData.filtertype[1]}`}</Alltype>
        )}
      </div>
      {/* + 이미지로 대체 해야함 */}
      <DropDownButton type="button" onClick={dropDownButton}>
        {dropDown ? '-' : '+'}
      </DropDownButton>
    </TypeBoxStyle>
  );
}

const TypeBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 20px 20px 0;
  border-bottom: 1px solid #ebebeb;
  button {
    height: 8px;
  }
`;

const TypeList = styled.div`
  padding: 4px 0;
`;

const TypeListCheckBox = styled.input`
  margin-right: 10px;
  border: 1px solid black;
  border-radius: 0;
`;

const TypeListLabel = styled.label`
  font-size: 14px;
`;

const FilterTitle = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
`;

const Alltype = styled.div`
  color: #9c9c9c;
`;

const DropDownButton = styled.button`
  font-size: 24px;
  color: #bfbfbf;
  cursor: pointer;
`;
