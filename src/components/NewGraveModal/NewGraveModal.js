import React from "react";
import styled from "styled-components/macro";
import Select from "react-select";
import * as yup from "yup";
import { setLocale } from "yup";

import { compressPhotos } from "../../lib/common-functions/common-functions";
import { getPhotosUrls } from "../../api/user";

setLocale({
  string: {
    min: "must be at least 2 chars",
  },
  date: {
    typeError: "the field must not me empty",
  },
});

let schema = yup.object().shape({
  name: yup.string().required().min(2),
  dateB: yup.date().required(),
  dateD: yup.date().required(),
  song: yup.string().required(),
  pics: yup.array().min(1),
});

export const NewGraveModal = ({ cellN }) => {
  const [l, setL] = React.useState(false);
  const [pics, setPics] = React.useState([]);
  const [name, setName] = React.useState("");
  const [dateB, setDateB] = React.useState("");
  const [dateD, setDateD] = React.useState("");
  const [lWords, setLWords] = React.useState("");
  const [song, setSong] = React.useState("");

  const [errThrown, setErrThrown] = React.useState("");

  const createPhotosBlobs = async (e) => {
    try {
      setL(true);
      const ph = await compressPhotos(e);
      setPics((prev) => [...prev, ...ph]);
      /*
      console.log(ph);
      const test = await Promise.all(
        ph.map(async (ph) => {
          return getPhotosUrls(ph);
        })
      );
      console.log(test);
      */
      setL(false);
    } catch (e) {
      setL(false);
      console.error(e);
      console.trace(e);
      alert(e);
    }
  };

  const handleNameInput = (e) => {
    setErrThrown('')
    setName(e.target.value);
  };
  const handleDateBInput = (e) => {
    setErrThrown('')
    setDateB(new Date(e.target.value).toISOString());
  };
  const handleDateDInput = (e) => {
    setErrThrown('')
    setDateD(new Date(e.target.value).toISOString());
  };
  const handleLWordsInput = (e) => {
    setErrThrown('')
    setLWords(e.target.value);
  };
  const handleLSongInput = (v) => {
    setErrThrown('')
    setSong(v.value);
  };

  const submitData = () => {
    /*
    schema
      .isValid({
        name,
        dateB,
        dateD,
        lWords,
        song,
      })
      .then((valid) => console.log(valid));*/
    schema
      .validate({
        name,
        dateB,
        dateD,
        lWords,
        song,
      })
      .then((value) => console.log(value))
      .catch((err) => {
        setErrThrown(err.params.path);
      });
  };

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
          <TextInput
            type="text"
            errThrown={errThrown === "name"}
            onChange={(e) => handleNameInput(e)}
          />
          <InputName>born:</InputName>
          <TextInput
            type="date"
            errThrown={errThrown === "dateB"}
            onChange={(e) => handleDateBInput(e)}
          />
          <InputName>died:</InputName>
          <TextInput
            type="date"
            errThrown={errThrown === "dateD"}
            onChange={(e) => handleDateDInput(e)}
          ></TextInput>
          <InputName>last words:</InputName>
          <TextInput
            type="text"
            errThrown={errThrown === "lWords"}
            onChange={(e) => handleLWordsInput(e)}
          ></TextInput>
          <InputName>song to mourn:</InputName>
          <Select
            onChange={(v) => handleLSongInput(v)}
            options={[{ value: "zemfira", label: "земфира - пммл" }]}
            styles={{
              container: (provided) => ({
                ...provided,
                width: "100%",
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                border:
                  errThrown === "song" ? "1px solid red" : "1px solid black",
              }),
              valueContainer: (provided) => ({
                ...provided,
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#fff",
                fontSize: "20px",
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
                fontSize: "20px",
                color: "#fff",
              }),
              singleValue: (provided) => ({
                ...provided,
                fontSize: "20px",
                color: "#fff",
              }),
            }}
          />
          <InputName>
            {pics.length < 1 ? "photos" : "click to add more"}
          </InputName>
          <FileInput errThrown={errThrown === "pics"}>
            {pics.length < 1 ? (
              <InputName>CLICK TO UPLOAD</InputName>
            ) : (
              pics.map((blob) => <LilPic key={blob.id} src={blob.url} />)
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => createPhotosBlobs(e)}
            ></input>
          </FileInput>
        </InputsContainer>
        <ButtonsCont>
          <OK onClick={submitData}>OK</OK>
          <Cancel>Cancel</Cancel>
        </ButtonsCont>
      </Diag>
    </NewGraveModalCont>
  );
};

const LilPic = styled.img`
  height: 100%;
  margin: 0px 5px;
`;

const FileInput = styled.div`
  width: 100%;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  ${(p) => p.errThrown && "border: 1px solid rgba(245, 66, 66, .8);"}
  input {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

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
  border: 1px solid ${(p) => (p.errThrown ? "rgba(245, 66, 66, .8)" : "black")};
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
