import React from "react";
import Camera from "../components/svg/Camera";
import { useState } from "react";
import { storage, db, auth } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
        console.log("snapData", docSnap.data());
      }
    });

    if (img) {
      // this is for uploadng image in storage
      const uploadImg = async () => {
        const inputRef = ref(
          storage,
          `avatar/${new Date().getTime()}-${img.name}`
        );

        try {
          const snap = await uploadBytes(inputRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          console.log("fullpath💯💯💯", snap.ref.fullPath);
          console.log("url💯💯💯", url);

          setImg("");

          // this for saving image url and image full url in DB

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
        } catch (error) {
          console.log(error.message);
        }
      };

      uploadImg();
    }
  }, [img]);

  if (!user) {
    return null;
  }

  return (
    <section>
      <div className="profile_container">
        <div className="img_conatiner">
          <img src={user.avatar} alt="profile" />
          <div className="overlay">
            <label htmlFor="photo">
              <Camera />
            </label>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="photo"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
        </div>

        <div className="text_container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
          <small>{user.cratedAt.toDate().toDateString()}</small>
        </div>
      </div>
    </section>
  );
};

export default Profile;
