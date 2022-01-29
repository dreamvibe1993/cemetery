import React from "react";
import styled from "styled-components/macro";
import Select from "react-select";

export const NewGraveModal = () => {
  return (
    <NewGraveModalCont>
      <Diag>
        <Title>This site is unoccupied.</Title>
        <Subtitle>
          Fill out the fields and click "OK" to create a burial or click
          "Cancel" to return to the graveyard.
        </Subtitle>
        <InputsContainer>
          <InputName>name:</InputName>
          <TextInput type="text"></TextInput>
          <InputName>born:</InputName>
          <TextInput type="date"></TextInput>
          <InputName>died:</InputName>
          <TextInput type="date"></TextInput>
          <InputName>last words:</InputName>
          <TextInput type="text"></TextInput>
          <InputName>song to mourn:</InputName>
          <Select
            options={[{ value: "zemfira", label: "Земфира - ПММЛ" }]}
            styles={{
              container: (provided) => ({
                ...provided,
                width: "100%",
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                border: "1px solid black",
              }),
              valueContainer: (provided) => ({
                ...provided,
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#fff",
                fontSize: '24px',
                textTransform: "lowercase",
              }),
              input: (provided) => ({
                ...provided,
                color: "#fff",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "rgba(74, 19, 53, 1)",
                color: "#fff",
              }),
              option: (provided) => ({
                ...provided,
                backgroundColor: "rgba(74, 19, 53, 1)",
                fontSize: '20px',
                color: "#fff",
              }),
              singleValue: (provided) => ({
                ...provided,
                fontSize: '20px',
                color: "#fff",
              }),
            }}
          />
          <InputName>photos:</InputName>
          <FileInput type="file"></FileInput>
        </InputsContainer>
        <ButtonsCont>
          <OK>OK</OK>
          <Cancel>Cancel</Cancel>
        </ButtonsCont>
      </Diag>
    </NewGraveModalCont>
  );
};

const FileInput = styled.input``;

const Button = styled.div`
  flex: 1;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OK = styled(Button)`
  margin-right: 5px;
`;
const Cancel = styled(Button)`
  margin-left: 5px;
`;

const ButtonsCont = styled.div`
  display: flex;
  padding: 5px;
`;

const TextInput = styled.input`
  -webkit-appearance: none;
  border: 1px solid black;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 40px;
  padding: 5px;
  color: #fff;
  font-size: 20px;
`;

const InputsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 15px;
  text-align: left;
  & > * {
    &:not(:first-child) {
      margin-top: 5px;
    }
  }
`;

const Title = styled.span`
  display: block;
  font-size: 36px;
`;

const Subtitle = styled(Title)`
  font-size: 24px;
  margin-top: 20px;
`;

const InputName = styled(Title)`
  font-size: 18px;
`;

const Diag = styled.div`
  height: 750px;
  width: 450px;
  background-color: #591740;
  padding: 20px 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const NewGraveModalCont = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999999999999 !important;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
