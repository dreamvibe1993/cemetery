import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components/macro";
import { ServiceButton } from "../../css/sc-components/ScComponents";

import GrassPattern from "../../../media/img/grave/grass-p-2.png";

import { NewGraveModal } from "../../Modals/NewGraveModal/NewGraveModal";
import { Tooltip } from "../../HOCs/Tooltip";
import { useDeleteGrave } from "../../../services/hooks/api/graves/useDeleteGrave";
import { showError } from "../../../services/errors/showError";
import { Grave } from "../Grave";
import { FadeIn } from "../../../configs/css/animations";
import { device } from "../../../configs/css/breakpoints";

export const CemetaryGrid = () => {
  const [deleteGrave] = useDeleteGrave();
  const { graves } = useSelector((state) => state.graves);
  const { isAuth, user, isAdmin } = useSelector((state) => state.user);
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
    if (!isAuth)
      return showError({
        message:
          "Only logged in users can create graves. Please log in or create account!",
      });
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
              content={`This is the tomb of ${cell?.name}. \nClick to visit.`}
              direction="bottom"
              key={cell?.name + i}
            >
              <Cell
                onClick={() => visitTomb(cell)}
                showDelButton={cell?.madeBy?.id === user.id || isAdmin}
              >
                <Grave grave={cell} />
                <DeleteButtonWrapper>
                  <ServiceButton
                    id="sbut"
                    onClick={(e) => deleteGrave(e, cell)}
                  >
                    DELETE
                  </ServiceButton>
                </DeleteButtonWrapper>
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

const DeleteButtonWrapper = styled.div`
  position: absolute;
  bottom: 15px;
  z-index: 99999;
`;

const Cell = styled.div`
  height: 100%;
  width: 100%;
  transition: all 0.2s linear;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(p) => p.theme.contrastB.rgba(1)};
  border-radius: 1px;
  background-size: 50%;
  position: relative;
  cursor: pointer;
  &:hover {
    &::after {
      transition: all 0.2s linear;
      background-color: ${(p) => p.theme.white.rgba(0.1)};
    }
    #sbut {
      opacity: ${p => p.showDelButton && 1};
      display: ${p => p.showDelButton && "block"};
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
    display: none;
    opacity: 0;
  }
  @media ${device.mobileL}, ${device.tablet} {
    #sbut {
      opacity: ${p => p.showDelButton ? 1 : 0};
      display: ${p => p.showDelButton ? "block" : "none"};
      padding: 5px;
      text-transform: lowercase;
    }
  }
`;

const CemetaryGridContainer = styled.div`
  background-color: ${(p) => p.theme.primary.rgba(1)};
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(4, 190px);
  grid-template-rows: repeat(3, 250px);
  gap: 5px;
  min-width: 770px;
  padding: 10px;
  animation: ${FadeIn} 0.2s linear forwards;
  @media ${device.mobileL} {
    width: 100vw;
    height: ${window.innerHeight - 50 + "px"};
    min-width: auto;
    grid-template-columns: repeat(3, calc(100vw / 3 - 10px));
    grid-template-rows: repeat(4, 22%);
  }
  @media ${device.tablet} {
    min-width: auto;
    grid-template-columns: repeat(4, calc(100vw / 5));
    grid-template-rows: repeat(3, 25vh);
    padding: 0px;
    margin: 0 auto;
  }
`;
