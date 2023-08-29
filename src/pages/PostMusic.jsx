import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function PostMusic() {
  const navigate = useNavigate();

  const initialState = {
    title: "",
    description: "",
    category: "",
  };

  const categoryItems = [
    {
        name: "Choose"
    },
    {
      name: "Punjabi",
    },
    {
        name: "Hindi"
    }
  ];

  const [musicData, setMusicData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [progress, setProgress] = useState(null);

  const { title, description, category } = musicData;

  useEffect(() => {
    if (file === null) return;

    const storageRef = ref(storage, `music/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progresss =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progresss);

        switch (snapshot.state) {
          case "paused":
            console.log("Paused");
            break;

          case "running":
            console.log("Running");
            break;

          case "success":
            alert("Image Uploaded");
            break;

          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setMusicData((prev) => ({ ...prev, musicURL: downloadURL }));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }, [file]);


  useEffect(() => {
    if (file === null) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progresss =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progresss);

        switch (snapshot.state) {
          case "paused":
            console.log("Paused");
            break;

          case "running":
            console.log("Running");
            break;

          case "success":
            alert("Image Uploaded");
            break;

          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setMusicData((prev) => ({ ...prev, imgURL: downloadURL }));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }, [img]);

  const handleTitle = (e) => {
    setMusicData({ ...musicData, title: e.target.value });
  };

  const handleSinger = (e) => {
    setMusicData({ ...musicData, singer: e.target.value });
  };

  const handleBlogContent = (e) => {
    setMusicData({ ...musicData, description: e.target.value });
  };

  const categoryHandle = (e) => {
    setMusicData({ ...musicData, category: e.target.value });
  };

  const addDataToFirebase = () => {
    console.log(title, description, category);
    if (title && description && category) {
      try {
        alert("Posting Music");
        addDoc(collection(db, `songs`), {
          ...musicData,
          timestamp: serverTimestamp(),
        });
        alert("Music Posted Successfully");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="bg-white text-dark p-5 mt-5" style={{maxWidth: "50rem", margin: "auto"}}>
        <div>
          <div>
            <h3 className="text-center">Share Your Music</h3>
            <div className="d-flex flex-column gap-3" style={{maxWidth: "50%", margin: "auto"}}>
            <input
              type="text"
              placeholder="Song Name"
              className="p-3"
              onChange={handleTitle}
            />

            <input
              type="text"
              className="p-3"
              placeholder="Singer Name"
              onChange={handleSinger}
            />

            <textarea
              type="textarea"
              className="p-3"
              placeholder="Song Information"
              onChange={handleBlogContent}
            />

            <label
              for="countries"
            >
              Select Language
            </label>
            <select
              onChange={categoryHandle}
              id="countries"
              className="py-3 bg-dark text-white border-0 rounded px-3"
            >
              {categoryItems.map((items) => {
                return <option key={items.name}>{items.name}</option>;
              })}
            </select>
            <label className="rounded">
                Select Music File
            </label>
            <input
              type="file"
              className="border p-3"
              placeholder="Pick Image"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label>
                Select Music Image
            </label>

            <input
              type="file"
              className="border p-3"
              placeholder="Pick Image"
              onChange={(e) => setImg(e.target.files[0])}
            />

            <button
            className="p-3 text-white border-0"
              type="submit"
              onClick={addDataToFirebase}
              disabled={progress !== null && progress < 100}
              style={{ backgroundColor: progress !== null && progress < 100 ? "gray" : "#fb923c" }}
            >
              Publish Music
            </button>
            </div>


          </div>

          <div className="text-center mt-3">
            Want to boost your content ?
            <Link
              to={"/signup"}
            >
              Get Premium
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}