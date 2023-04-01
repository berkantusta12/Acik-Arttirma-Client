import React from "react";
import moment from "moment";
import { makeStyles } from "tss-react/mui";
import { Link } from "react-router-dom";
import {
  Card,
  Chip,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { InputNumber } from "antd";
import { useState, useEffect } from "react";
import { Buffer } from "buffer";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      maxWidth: 374,
      position: "relative",
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backgroundBlendMode: "darken",
    },
    overplay: {
      position: "absolute",
      top: "20px",
      left: "20px",
      color: "#fff",
    },
    chip: {
      marginTop: theme.spacing(1),
    },
    breakword: {
      wordBreak: "break-word",
    },
  };
});

const Post = ({
  _id,
  title,
  subtitle,
  content,
  content2,
  tag,
  image,
  createdAt,
  minBid,
}) => {
  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  const { classes } = useStyles();

  let [socket, setSocket] = useState(null);
  const [inputValue, setInputValue] = useState(minBid); // minBid değerini başlangıç değeri olarak kullanıyoruz

  const [lastBid, setLastBid] = useState();

  const onBidSubmit = (e) => {
    if (inputValue < lastBid) {
      alert("Teklifiniz son verilen teklifinden büyük olmalıdır.");
      return;
    }
    setLastBid(inputValue);
    let product = {
      id: _id,
      bid: inputValue,
    };
    socket.send(JSON.stringify(product));
    alert("Teklifiniz başarıyla kaydedildi.");
  };

  const onChange = (value) => {
    setInputValue(value);
  };

  const onBlur = () => {
    if (inputValue < minBid) {
      setInputValue(minBid);
    }
  };

  var W3CWebSocket = require("websocket").w3cwebsocket;
  let clientID = Math.floor(Math.random() * 10);
  socket = new W3CWebSocket("ws://localhost:8080/", clientID);
  socket.binaryType = "arraybuffer";

  socket.onerror = function () {
    console.log("Connection Error");
  };

  socket.onopen = function () {
    console.log("WebSocket Client Connected");
  };

  socket.onclose = function () {
    console.log("echo-protocol Client Closed");
  };

  const bufferToUint8Array = require("buffer-to-uint8array");

  socket.onmessage = function (e) {
    console.log(e.data);
    const receivedData = JSON.parse(e.data);
    const bufferData = Buffer.from(new Uint8Array(receivedData.data).buffer);
    console.log("Received", bufferData.toString("utf-8"));

    if (_id === JSON.parse(bufferData.toString("utf-8")).id) {
      console.log("id", JSON.parse(bufferData.toString("utf-8")).id);
      // setInputValue(JSON.parse(bufferData.toString("utf-8")).bid);
      setLastBid(JSON.parse(bufferData.toString("utf-8")).bid);
    }
  };
  useEffect(() => {}, [socket]);

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={image} title="Resim" />
      <div className={classes.overplay}>
        <Typography variant="h6">Berkant</Typography>
        <Typography variant="body2">
          {convertRelativeTime(createdAt)}
        </Typography>
      </div>
      <CardContent>
        <Typography variant="h6" component="p" gutterBottom>
          {title.substring(0, 60) + (title.length > 60 ? "..." : "")}
        </Typography>
        <Typography variant="overline" component="p" gutterBottom>
          {subtitle.substring(0, 70) + (subtitle.length > 70 ? "..." : "")}
        </Typography>
        <Typography
          className={classes.breakword}
          variant="body2"
          component="p"
          gutterBottom
        >
          {content.substring(0, 240) + (content.length > 240 ? "..." : "")}
        </Typography>
        <Typography
          className={classes.breakword}
          variant="body2"
          component="p"
          gutterBottom
        >
          {content2.substring(0, 240) + (content2.length > 240 ? "..." : "")}
        </Typography>
        <Typography
          className={classes.breakword}
          variant="body2"
          component="p"
          gutterBottom
        >
          <InputNumber
            min={minBid}
            max={10000000}
            value={inputValue}
            onChange={onChange}
            onBlur={onBlur}
            // disabled={inputValue < minBid}

            onStep={(value, info) => {
              if (info.type === "down") {
                setInputValue(minBid);
              }
            }}
          />
          <Button onClick={onBidSubmit}> Teklif Ver </Button>
          {lastBid !== null && <div>Son teklif: {lastBid}</div>}
        </Typography>
        <Chip label={` # ${tag}`} variant="outlined" className={classes.chip} />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={`/${_id}`}>DAHA FAZLA..</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
