import React from "react";
import styled from "styled-components/macro";

export const TombChatLogs = ({ grave }) => {
  return (
    <LogsCont>
      <Log>
        {grave?.chatLogs.map((entry, i) => {
          return (
            <LogEntry key={entry + i}>
              <LogDiagSign>&gt;</LogDiagSign> {entry}
            </LogEntry>
          );
        })}
      </Log>
    </LogsCont>
  );
};

const LogDiagSign = styled.span`
  color: ${p => p.theme.secondaryB.hex};
`;

const LogEntry = styled.span`
  display: block;
`;

const Log = styled.div`
  background-color: ${p => p.theme.contrastB.rgba(0.3)};
  height: 100%;
  min-height: 100px;
  width: 100%;
  padding: 10px;
  max-height: 236px;
  overflow-y: auto;
`;

const LogsCont = styled.span`
  flex: 1;
  margin-top: 5px;
`; //left a candy; left 1.25 btc
