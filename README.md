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

/**********************************
* User routes
***********************************/
  router.post('/login')
  router.post('/users')
  router.get('/users')
  router.get('/me')
  router.get('/users/:id')
  router.delete('/users/:id')
  router.put('/users/:id')


/**********************************
* MyChannel routes
***********************************/

  router.put('/me/channels')
  router.post('/me/channels/add/')
  router.get('/me/channels')
  router.delete('/me/channels')
  router.delete('/me/channels/:id')

/**********************************
* Channel Routes
***********************************/
  router.post('/channels')
  router.get('/channels')
  router.get('/channels/:id')
  router.put('/channels/:id')
  router.delete('/channels/:id')

/**********************************
* Video Routes
***********************************/
  router.get('/channels/:id/videos')
  router.post('/channels/:id/videos')
  router.delete('/channels/:id/videos')
  router.get('/videos/:id/:vidId')



### Data Models

var channelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  imageUrl: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Televison_Hungarian_ORION_1957.jpg/800px-Televison_Hungarian_ORION_1957.jpg"},
  createdBy: String,
  curatedBy: [String],
  videos: [Video.schema],
  isPrivate: {type: Boolean, default: false},
  accessList: [],
  description: String,
  votes: [{userEmail: String, vote: Number}],
  dateAdded: { type: Date, default: Date.now }
});

var myChannelSchema = new mongoose.Schema({
  name: {type: String, required: true},
  isCurator: Boolean,
});

var userSchema = new mongoose.Schema({
  email: {
    type:     String,
    unique:   true,
    required: true
  },
  handle: {
    type:    String,
    unique:  true,
    required: true
  },
  city:  {type: String, default: 'Pasadena'},
  state: {type: String, default: 'CA'},
  zip:   {type: String, default: '91101'},
  myChannels: [MyChannel.schema],
  isAdmin: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  password: {type: String, required: true, bcrypt: true}
});

var videoSchema = new mongoose.Schema({
  title:        {type: String},
  url:          {type: String},
  votes:        [{userEmail: String, vote: Number}],
});


***

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

Copyright (c) 2015-2016 Andrew A. Anissi
