import React from "react";
import styled from "styled-components/macro";
// import Select from "react-select";
import { setLocale } from "yup";

import { ReactComponent as Cross } from "../../media/svg/cross.svg";
import { compressPhotos } from "../../services/data-transformation/converting";
import { loadGraves, postNewGrave } from "../../api/graves";
import { Preloader } from "../Preloader";
import { graveSchema } from "../../models/yup/yup-schemas";
import { colors } from "../../configs/css/colors";

setLocale({
  string: {
    min: "must be at least 2 chars",
  },
  date: {
    typeError: "the field must not me empty",
  },
});

export const NewGraveModal = ({ graveCellNum, onClose = () => {} }) => {
  const [l, setL] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);
  const [name, setName] = React.useState("");
  const [born, setBorn] = React.useState("");
  const [died, setDied] = React.useState("");
  const [lastWords, setLastWords] = React.useState(" ");
  // const [songs, setSongs] = React.useState({
  //   label: "земфира - пммл",
  //   value: "zemfira",
  // });

  const [errThrown, setErrThrown] = React.useState("");

  const createPhotosBlobs = async (e) => {
    try {
      setL(true);
      const ph = await compressPhotos(e);
      setPhotos((prev) => [...prev, ...ph]);
      setL(false);
    } catch (e) {
      setL(false);
      console.error(e);
      console.trace(e);
      alert(e);
    }
  };

  const deletePhoto = (id) => {
    setPhotos((prev) => prev.filter((blob) => blob.id !== id));
  };

  const handleNameInput = (e) => {
    setErrThrown("");
    setName(e.target.value);
  };
  const handleDateBInput = (e) => {
    setErrThrown("");
    setBorn(e.target.value);
  };
  const handleDateDInput = (e) => {
    setErrThrown("");
    setDied(e.target.value);
  };
  const handleLWordsInput = (e) => {
    setErrThrown("");
    setLastWords(e.target.value);
  };
  // const handleLSongInput = (v) => {
  //   setErrThrown("");
  //   setSongs(v);
  // };

  const submitData = () => {
    setErrThrown("");
    const dataToPost = {
      name,
      born,
      died,
      lastWords,
      // songs,
      photos,
    };
    graveSchema
      .validate(dataToPost)
      .then(async () => {
        try {
          setL(true);
          await postNewGrave({
            ...dataToPost,
            graveCellNum: graveCellNum.toString(),
            lastWords,
          });
          loadGraves();
          onClose();
        } catch (e) {
          alert("something went wrong. sorry");
          onClose();
          console.error(e);
          console.trace(e);
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err, false, 1));
        const sErr = ["photos", "lastWords"];
        if (sErr.includes(err.params.path)) {
          alert(err.errors[0]);
        }
        setErrThrown(err.params.path);
      });
  };

  if (l)
    return (
      <NewGraveModalCont>
        <PreloaderCont>
          <Preloader />
        </PreloaderCont>
      </NewGraveModalCont>
    );

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
            maxLength={20}
            defaultValue={name}
          />
          <InputName>born:</InputName>
          <TextInput
            type="date"
            errThrown={errThrown === "born"}
            onChange={(e) => handleDateBInput(e)}
            defaultValue={born}
          />
          <InputName>died:</InputName>
          <TextInput
            type="date"
            errThrown={errThrown === "died"}
            onChange={(e) => handleDateDInput(e)}
            defaultValue={died}
          ></TextInput>
          <InputName>last words:</InputName>
          <TextInput
            type="text"
            errThrown={errThrown === "lastWords"}
            onChange={(e) => handleLWordsInput(e)}
            maxLength={32}
            defaultValue={lastWords}
          ></TextInput>
          <InputName>song to mourn:</InputName>
          {/* <Select
            onChange={(v) => handleLSongInput(v)}
            options={[{ value: "zemfira", label: "земфира - пммл" }]}
            defaultInputValue={songs.label}
            styles={{
              container: (provided) => ({
                ...provided,
                width: "100%",
                zIndex: 999,
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                border: errThrown === "song" ? "1px solid red" : "none",
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
          /> */}
          <InputName>
            {photos.length < 1 ? "photos" : "click to add more"}
          </InputName>
          <FileInput errThrown={errThrown === "photos"}>
            {photos.length < 1 ? (
              <InputName>CLICK TO UPLOAD</InputName>
            ) : (
              photos.map((blob) => (
                <LilPicCont key={blob.id}>
                  <Cross onClick={() => deletePhoto(blob.id)} />
                  <LilPic src={blob.url} />
                </LilPicCont>
              ))
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
          <Cancel onClick={onClose}>Cancel</Cancel>
        </ButtonsCont>
      </Diag>
    </NewGraveModalCont>
  );
};

const LilPicCont = styled.div`
  position: relative;
  z-index: 10;
  &:hover {
    & > svg {
      opacity: 1;
    }
  }
  svg {
    transition: opacity 0.4s linear;
    width: 11px;
    height: 11px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.2);
    opacity: 0;
    cursor: pointer;
  }
`;

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
  overflow-x: auto;
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
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const OK = styled(Button)`
  margin-right: 5px;
`;
const Cancel = styled(Button)`
  margin-left: 5px;
`;

const ButtonsCont = styled.div`
  display: flex;
`;

const TextInput = styled.input`
  -webkit-appearance: none;
  border: ${(p) =>
    p.errThrown ? "1px solid " + colors.error.hex : "none"};
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  color: #fff;
  font-size: 20px;
  border-radius: 2px;
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
  margin-top: 50px;
  height: 750px;
  width: 450px;
  background-color: ${colors.primary.rgba(0.8)};
  padding: 20px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const PreloaderCont = styled(Diag)`
  justify-content: center;
  align-items: center;
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
  align-items: flex-start;
  overflow-y: auto;
`;
