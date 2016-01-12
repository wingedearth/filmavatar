#FILM AVATAR

###Field of the Application
With the replacement of free over-the-air broadcast television by 
subscription-based over-the-top (OTT) content (e.g. via Hulu,
Netflix, Amazon Video, etc.) and pay-per-download options (e.g. iTunes),
there is a need for curated, ad-free premium free video content available 
to the public. "The introduction of the first, legitimate Web-based 
television services happened in 2015. These new options stream live 
television channels. They include Sling TV from Dish Network and Vue 
on Sony's PlayStation game console."

While "cord-cutting" users benefit from greater access to content
and on-demand viewing, what's missing from the new paradigm is:

1) Local curators, and
2) Free videos

In the past, both of these functions were carried out by public
broadcasting stations, each of whom operates independently in each
community throughout the United States to select and curate
television content for free public broadcast based on each station's
relationship with its local community. To a lesser extent, affiliates 
of national TV networks would also provide certain content with a 
local emphasis via locally produced news programs.

See the following articles for more information:

- [Welcome to Web TV, Cord Cutters. Don't Forget Your Credit Card](http://www.cnet.com/news/welcome-to-web-tv-cord-cutters-dont-forget-your-credit-card/)
- [The End of Free TV](http://www.thewire.com/technology/2013/04/end-free-tv/64004/)


###Summary of the Application

A platform for users to curate their own Web-TV station or 
video gallery using links and third party APIs to access videos.
Channel Pasadena provides a video player, content related to each
video (description, image, cast/crew, etc.) and a user-controlled
database of videos for each station.

### Technologies
1. MongoDB
2. Express.js
3. Angular.js
4. Node.js
5. Javascript
6. HTML5
7. CSS3
8. Git / Github
9. Heroku
10. MaterializeCSS


### Routes


|  OMDB Routes      | req.body          | description
|------------------|-----------|----------------|
| post('/api/info')	| {title: TITLE} 	| pull video info from OMDB|
| post('/info')    | {title: TITLE}	| pull video info from OMDB|



|  User Routes      |           |
|------------------|-----------|
| post('/api/login')          | login user / generate token     |
| post('/api/users')          | create user                 |
| get('/api/users')           | get all users               |
| get('/api/me')           | get current user            |
| get('/api/users/:id')    | get particular user (by id) |
| delete('/api/users/:id') | delete a user               |
| put('/api/users/:id')    | edit a user                 |



** myChannels are a user's own channels list**


|  MyChannel Routes       |           |
|-------------------------|-----------|
| put('/api/me/channels') | edit current user's subscribed channels |
| post('/api/me/channels/add/') | subscribe to a channel (add it to myChannel) |
| get('/api/me/channels') | get current user's subscribed channels |
| delete('/api/me/channels') | unsubscribe by channel name |
| delete('/api/me/channels/:id') | unsubscrube by channel _id |

|  Channel Routes      |           |
|----------------------|-----------|
| post('/api/login')			| login user / generate token     |
| post('/api/channels')				| add a new channel |
| get('/api/channels') 				| get all channels |
| get('/api/channels/:id')  		| get a particular channel |
| put('/api/channels/:id')			| edit a channel |
| delete('/api/channels/:id')		| delete a channel |


|  Video Routes			|           |
|----------------------|-----------|
| get('/api/channels/:id/videos') 		| get all videos on a channel |
| post('/api/channels/:id/videos')		| add a new video |
| put ('/api/videos/:id') 	| delete a video** |
| get('/api/videos/:id/:vidId')			| get a particular video

** The delete video route is set up as a PUT route. This helps to send
a req.body with a title object. The :id in this route refers to the
channel's id, not the video's id. I know, it can get confusing, but
it works so I decided to leave it alone for now.


### Data Models

- channelSchema<br>
  name: { type: String, required: true, unique: true },<br>
  imageUrl: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Televison_Hungarian_ORION_1957.jpg/800px-Televison_Hungarian_ORION_1957.jpg"},<br>
  createdBy: String,<br>
  curatedBy: [String],<br>
  videos: [Video.schema],<br>
  isPrivate: {type: Boolean, default: false},<br>
  accessList: [],<br>
  description: String,<br>
  votes: [{userEmail: String, vote: Number}],<br>
  dateAdded: { type: Date, default: Date.now }


- myChannelSchema<br>
  name: {type: String, required: true},<br>
  isCurator: Boolean,


- userSchema<br>
  email: {<br>
    type:     String,<br>
    unique:   true,<br>
    required: true<br>
  },<br>
  handle: {<br>
    type:    String,<br>
    unique:  true,<br>
    required: true<br>
  },<br>
  city:  {type: String, default: 'Pasadena'},<br>
  state: {type: String, default: 'CA'},<br>
  zip:   {type: String, default: '91101'},<br>
  myChannels: [MyChannel.schema],<br>
  isAdmin: { type: Boolean, default: false },<br>
  created: { type: Date, default: Date.now },<br>
  password: {type: String, required: true, bcrypt: true}<br>


- videoSchema<br>
  title:        {type: String},<br>
  url:          {type: String},<br>
  votes:        [{userEmail: String, vote: Number}],<br>



***

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

Copyright (c) 2015-2016 Andrew A. Anissi
