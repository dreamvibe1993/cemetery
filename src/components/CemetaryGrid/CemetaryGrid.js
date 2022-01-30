import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components/macro";

import GrassPattern from "../../media/img/grave/grass-p-2.png";

import { Grave } from "../Grave";
import { NewGraveModal } from "../NewGraveModal/NewGraveModal";
import { Tooltip } from "../Tooltip";

export const CemetaryGrid = () => {
  const { users } = useSelector((state) => state.user);
  const [redirect, setRedirect] = React.useState(null);
  const [cells, setCells] = React.useState([]);
  const [cellNumChosen, setCellNumChosen] = React.useState(false);

  React.useEffect(() => {
    const cells = new Array(12).fill(null);
    if (!users) {
      setCells(cells);
      return;
    }
    if (users.length > 12) return;
    users.forEach((user) => {
      cells[user?.graveCellNum] = user;
    });
    setCells(cells);
  }, [users]);

  const visitTomb = (user) => {
    setRedirect("/tomb?userId=" + user.id);
  };

  const askNewGrave = (i) => {
    setCellNumChosen(i);
  };

  const closeNewGraveDiag = () => {
    setCellNumChosen(false);
  };

  if (redirect) return <Navigate to={redirect} />;

  return (
    <>
      {cellNumChosen !== false && (
        <NewGraveModal cellN={cellNumChosen} onClose={closeNewGraveDiag} />
      )}
      <CemetaryGridContainer>
        {cells.map((cell, i) =>
          cell ? (
            <Tooltip
              content={`This grave belongs to ${cell?.name}. \nClick to visit.`}
              direction="bottom"
              key={cell?.name + i}
            >
              <Cell onClick={() => visitTomb(cell)}>
                <Grave />
              </Cell>
            </Tooltip>
          ) : (
            <Cell
              key={i + new Date().getTime()}
              onClick={() => askNewGrave(i)}
            ></Cell>
          )
        )}
      </CemetaryGridContainer>
    </>
  );
};

const Cell = styled.div`
  width: 100%;
  height: 100%;
  transition: all 0.2s linear;
  background-color: #183516;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${GrassPattern}) repeat;
  background-size: 50%;
  position: relative;
  cursor: pointer;
  &:hover {
    &::after {
      transition: all 0.2s linear;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
`;

const CemetaryGridContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #1c3c1a;
  display: grid;
  grid-template-columns: 210px 210px 210px 210px;
  grid-template-rows: 280px 280px 280px;
  padding: 10px;
`;
