import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { TextField, Typography, Paper, Button } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/post";
import { useSelector } from "react-redux";
const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.Posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    creator: "",
    message: "",
    tags: "",
    title: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear()
    
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      message: "",
      tags: "",
      title: "",
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name={"creator"}
          variant="outlined"
          label="creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name={"message"}
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name={"tag"}
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <TextField
          name={"title"}
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) =>
            setPostData(
              { ...postData, title: e.target.value },
              console.log(e.target.value)
            )
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type={"file"}
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
