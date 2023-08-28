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
      <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">Share Your Music</h1>
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Song Name"
              onChange={handleTitle}
            />

            <textarea
              type="textarea"
              class="block border border-grey-light w-full h-[200px] p-3 rounded mb-4"
              placeholder="Song Information"
              onChange={handleBlogContent}
            />

            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Select Language
            </label>
            <select
              onChange={categoryHandle}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {categoryItems.map((items) => {
                return <option key={items.name}>{items.name}</option>;
              })}
            </select>

            <input
              type="file"
              placeholder="Pick Image"
              className="block border border-grey-light w-full p-3 rounded mb-4 mt-4"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <input
              type="file"
              placeholder="Pick Image"
              className="block border border-grey-light w-full p-3 rounded mb-4 mt-4"
              onChange={(e) => setImg(e.target.files[0])}
            />

            <button
              type="submit"
              onClick={addDataToFirebase}
              style={{ backgroundColor: "#fb923c" }}
              disabled={progress !== null && progress < 100}
              class="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Publish Music
            </button>
          </div>

          <div class="text-grey-dark mt-6">
            Want to boost your content ?
            <Link
              to={"/signup"}
              class="ml-2 text-orange-400 no-underline border-b border-blue text-blue"
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