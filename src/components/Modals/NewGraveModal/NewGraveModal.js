import React from "react";
import styled from "styled-components/macro";
// import Select from "react-select";
import { ReactComponent as Cross } from "../../../media/svg/cross.svg";
import { compressPhotos } from "../../../services/data-transformation/converting";
import { loadGraves, postNewGrave } from "../../../api/graves";
import { Preloader } from "../../App/Preloader";
import { graveSchema } from "../../../models/yup/yup-schemas";
import { colors } from "../../../configs/css/colors";
import { showError } from "../../../services/errors/showError";
import { FadeIn } from "../../../configs/css/animations";
import { Backdrop } from "../../App/Backdrop";
import { useSelector } from "react-redux";

export const NewGraveModal = ({ graveCellNum, onClose = () => {} }) => {
  const { user, isAuth } = useSelector((state) => state.user);
  const [l, setL] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);
  const [name, setName] = React.useState("");
  const [born, setBorn] = React.useState("1991-03-02");
  const [died, setDied] = React.useState("2022-02-24");
  const [lastWords, setLastWords] = React.useState("");
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

  const submitData = (e) => {
    if (!isAuth) return showError("Please authorize.")
    e.preventDefault();
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
      .then(async (validated) => {
        try {
          setL(true);
          await postNewGrave({
            ...dataToPost,
            graveCellNum: graveCellNum.toString(),
          });
          loadGraves();
          onClose();
        } catch (e) {
          onClose();
          console.error(e);
          console.trace(e);
        }
      })
      .catch((err) => {
        showError({ message: err.errors[0] });
        setErrThrown(err.params.path);
      });
  };

  if (l)
    return (
      <Backdrop>
        <PreloaderCont>
          <Preloader />
        </PreloaderCont>
      </Backdrop>
    );

  return (
    <>
      <Backdrop onClick={onClose} />
      <Diag onSubmit={(e) => submitData(e)}>
        <Title>This site is unoccupied.</Title>
        <Subtitle>
          Fill out the fields and click "OK" to create a burial or click
          "Cancel" to return to the graveyard.
        </Subtitle>
        <InputsContainer>
          <Row>
            {/* <InputName>name:</InputName> */}
            <TextInput
              placeholder="name"
              type="text"
              errThrown={errThrown === "name"}
              onChange={(e) => handleNameInput(e)}
              maxLength={20}
              defaultValue={name}
              required
            />
          </Row>
          <RowWithDate>
            <InputDateName>born</InputDateName>
            <TextInput
              placeholder="born"
              type="date"
              errThrown={errThrown === "born"}
              onChange={(e) => handleDateBInput(e)}
              defaultValue={born}
              required
            />
          </RowWithDate>
          <RowWithDate>
            <InputDateName>died</InputDateName>
            <TextInput
              placeholder="died"
              type="date"
              errThrown={errThrown === "died"}
              onChange={(e) => handleDateDInput(e)}
              defaultValue={died}
              required
            />
          </RowWithDate>
          <Row>
            <TextInput
              placeholder="last words"
              type="text"
              errThrown={errThrown === "lastWords"}
              onChange={(e) => handleLWordsInput(e)}
              maxLength={32}
              defaultValue={lastWords}
              required
            />
          </Row>
          <Row>
            <FileInput errThrown={errThrown === "photos"}>
              {photos.length < 1 ? (
                <InputName>CLICK TO UPLOAD PHOTOS</InputName>
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
          </Row>
        </InputsContainer>
        <ButtonsCont>
          <OK type="submit">OK</OK>
          <Cancel onClick={onClose}>Cancel</Cancel>
        </ButtonsCont>
      </Diag>
    </>
  );
};

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const RowWithDate = styled(Row)`
  padding-left: 10px;
  input {
    width: 85%;
  }
`;

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

const Button = styled.button`
  color: white;
  font-family: inherit;
  font-weight: bold;
  text-transform: uppercase;
  font-size: inherit;
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
  margin-top: 10px;
`;

const TextInput = styled.input`
  -webkit-appearance: none;
  border: ${(p) => (p.errThrown ? "1px solid " + colors.error.hex : "none")};
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  color: #fff;
  font-size: 20px;
  border-radius: 2px;
  background-color: transparent;
  ::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
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

const InputDateName = styled(InputName)`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.4);
`;

const Diag = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  background-color: ${colors.primary.rgba(1)};
  padding: 20px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  z-index: 999;
  animation: ${FadeIn} 0.2s linear forwards;
`;

const PreloaderCont = styled(Diag)`
  justify-content: center;
  align-items: center;
`;

/* <InputName>song to mourn:</InputName> */
/* <Select
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
          /> */
