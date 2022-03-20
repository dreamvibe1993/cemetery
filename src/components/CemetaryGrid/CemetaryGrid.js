import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components/macro";
import { ServiceButton } from "../css/sc-components/ScComponents";

import GrassPattern from "../../media/img/grave/grass-p-2.png";

import { Grave } from "../Grave";
import { NewGraveModal } from "../NewGraveModal/NewGraveModal";
import { Tooltip } from "../Tooltip";
import { pxToVh, pxToVw } from "../../services/css/convertion/sizes";
import { colors } from "../../configs/css/colors";
import { useDeleteGrave } from "../../services/hooks/graves/useDeleteGrave";
import { showError } from "../../services/errors/showError";

export const CemetaryGrid = () => {
  const deleteGrave = useDeleteGrave();
  const { graves } = useSelector((state) => state.graves);
  const { isAuth, user } = useSelector((state) => state.user);
  const [redirect, setRedirect] = React.useState(null);
  const [cells, setCells] = React.useState([]);
  const [cellNumChosen, setCellNumChosen] = React.useState(false);

  React.useEffect(() => {
    const cells = new Array(12).fill(null);
    if (!graves) {
      setCells(cells);
      return;
    }
    if (graves.length > 12) return;
    graves.forEach((grave) => {
      cells[grave?.graveCellNum] = grave;
    });
    setCells(cells);
  }, [graves]);

  const visitTomb = (grave) => {
    setRedirect("/tomb?graveId=" + grave._id);
  };

  const askNewGrave = (i) => {
    if (!isAuth) return showError({message: "Only logged in users can create graves. Please log in or create account!"})
    setCellNumChosen(i);
  };

  const closeNewGraveDiag = () => {
    setCellNumChosen(false);
  };

  if (redirect) return <Navigate to={redirect} />;

  return (
    <>
      {cellNumChosen !== false && (
        <NewGraveModal
          graveCellNum={cellNumChosen}
          onClose={closeNewGraveDiag}
        />
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
                {cell?.madeBy === user.id && (
                  <ServiceButton
                    id="sbut"
                    style={{
                      position: "absolute",
                      bottom: "15px",
                      zIndex: 99999,
                    }}
                    onClick={(e) => deleteGrave(e, cell)}
                  >
                    DELETE
                  </ServiceButton>
                )}
              </Cell>
            </Tooltip>
          ) : (
            <Cell
              key={i + new Date().getTime()}
              onClick={() => askNewGrave(i)}
            />
          )
        )}
      </CemetaryGridContainer>
    </>
  );
};

const Cell = styled.div`
  width: ${pxToVw(190, window.innerWidth)};
  min-width: 190px;
  height: ${pxToVh(250, window.innerWidth)};
  min-height: 250px;
  transition: all 0.2s linear;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: url(${GrassPattern}) repeat; */
  background-size: 50%;
  position: relative;
  cursor: pointer;
  &:hover {
    &::after {
      transition: all 0.2s linear;
      background-color: rgba(255, 255, 255, 0.1);
    }
    #sbut {
      opacity: 1;
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
  #sbut {
    opacity: 0;
  }
`;

const CemetaryGridContainer = styled.div`
  background-color: ${colors.primary.rgba(0.4)};
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(3, auto);
  gap: 5px;
  min-width: 770px;
  padding: 10px;
`;
