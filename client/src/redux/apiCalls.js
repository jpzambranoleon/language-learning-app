import { userRequest } from "../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

// create the AI assistant
export const createAssistant1 = (
  data,
  setLoading,
  setStatus,
  handleNext,
  file
) => {
  const fileName = new Date().getTime() + file.name;
  console.log(fileName);
  const storage = getStorage(app);
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        data.avatar = downloadURL;
        setLoading(true);
        userRequest
          .post("/assistants/create", {
            data,
          })
          .then((res) => {
            setStatus({
              open: true,
              message: res.data.message,
              severity: "success",
            });
            setLoading(false);
            handleNext();
          })
          .catch((err) => {
            let message = err.response
              ? err.response.data.message
              : err.message;
            setStatus({ open: true, message: message, severity: "error" });
            setLoading(false);
          });
      });
    }
  );
};

export const createAssistant2 = (data, setLoading, setStatus, handleNext) => {
  setLoading(true);
  userRequest
    .post("/assistants/create", {
      data,
    })
    .then((res) => {
      setStatus({
        open: true,
        message: res.data.message,
        severity: "success",
      });
      setLoading(false);
      handleNext();
    })
    .catch((err) => {
      let message = err.response ? err.response.data.message : err.message;
      setStatus({ open: true, message: message, severity: "error" });
      setLoading(false);
    });
};

// update the AI assistant
export const updateAssistant = (assistantId, data, setStatus, file) => {
  if (file) {
    const fileName = new Date().getTime() + file.name;
    console.log(fileName);
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          data.avatar = downloadURL;
          userRequest
            .put(`/assistants/udpate/${assistantId}`, {
              data,
            })
            .then((res) => {
              setStatus({
                open: true,
                message: res.data.message,
                severity: "success",
              });
            })
            .catch((err) => {
              let message = err.response
                ? err.response.data.message
                : err.message;
              setStatus({ open: true, message: message, severity: "error" });
            });
        });
      }
    );
  } else {
    userRequest
      .put(`/assistants/update/${assistantId}`, {
        data,
      })
      .then((res) => {
        setStatus({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      })
      .catch((err) => {
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
  }
};
