import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import './index.css';

//Tweet component
function Tweet({ tweet }) {
    return(
        <div className="tweet">
            <Avatar hash={tweet.gravatar}/>
            <div className="content">
                <Author author={tweet.author}/>
                <Time time={tweet.timestamp}/>
                <Message text={tweet.message}/>
                <div className="buttons">
                    <ReplyButton/>
                    <RetweetButton count={tweet.retweets}/>
                    <LikeButton count={tweet.likes}/>
                    <MoreOptionsButton/>
                </div>
            </div>
        </div>
    );
}

Tweet.propTypes = {
    tweet: PropTypes.shape({
        gravatar: PropTypes.string.isRequired,
        author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            handle: PropTypes.string.isRequired
        }).isRequired,
        timestamp: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        retweets: PropTypes.number.isRequired,
        likes: PropTypes.number.isRequired
    }).isRequired
};

function Avatar({ hash }) {
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return(
        <img
            src={url}
            className="avatar"
            alt="avatar"/>
    );
}

Avatar.propTypes = {
    hash: PropTypes.string
};

function Message({ text }) {
    return(
        <div className="message">
            {text}
        </div>
    );
}

Message.propTypes = {
    text: PropTypes.string
}
function Author({ author }) {
    const { name, handle } = author;
    return(
        <span className="author">
            <span className="name">{name}</span>
            <span className="handle">@{handle}</span>
        </span>
    );
}

Author.propTypes = {
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        handle: PropTypes.string.isRequired
    }).isRequired
};

const Time = ({ time }) => {
    const timeString = moment(time).fromNow();
    return(
        <span className="time">
            {timeString}
        </span>
    );
};

Time.propTypes = {
    time: PropTypes.string
}

const ReplyButton = () => (
    <i className="fa fa-reply reply-button"/>
);

function getRetweetCount(count) {
    if(count > 0){
        return(
            <span className="retweet-count">
                { count }
            </span>
        );
    } else {
        return null;
    }
}

const RetweetButton = ({ count }) => (
    <span className="retweet-button">
        <i className="fa fa-retweet"/>
        {getRetweetCount(count)}
    </span>
);

RetweetButton.propTypes = {
    count: PropTypes.number
}

const LikeButton = ({ count }) => (
    <span className="like-button">
        <i className="fa fa-heart"/>
        {count > 0 &&
            <span className="like-count">
                {count}
            </span>}
    </span>
);

LikeButton.propTypes = {
    count: PropTypes.number
};

const MoreOptionsButton = () => (
    <i className="fa fa-ellipsis-h more-options-button"/>
);

//Tweet Props
const testTweet = {
    message: "Welcome to my world, the world of Walmart",
    gravatar: "73323edd32dcf631107ad058d2e803c5",
    author: {
        handle: "shane_coll_v2",
        name: "Shane Coll"
    },
    likes: 8,
    retweets: 3,
    timestamp: "2016-07-30 21:24:37"
};

ReactDOM.render(<Tweet tweet={testTweet}/>, 
    document.querySelector('#root'))