# Sharify

<p align="center"> 
  <img src="https://user-images.githubusercontent.com/65967989/233854956-300c21e4-cbc6-4fd4-a9b8-613ce8ccfe24.png" />
</p>
<p align="center"> 
  <h1 align="center">Sharify your Spotify</h1>
</p>


## content
 - [Disclaimer](https://github.com/A-bahaa/Sharify-Documentation#disclaimer) 
 - [Motivation](https://github.com/A-bahaa/Sharify-Documentation#motivation) 
 - [Capabilties](https://github.com/A-bahaa/Sharify-Documentation#capabilties)
 - [Product Design](https://github.com/A-bahaa/Sharify-Documentation#product-design)
 - [Auth](https://github.com/A-bahaa/Sharify-Documentation#auth)
 - [How to gain Access ?](https://github.com/A-bahaa/Sharify-Documentation#how-to-gain-access-) 
 - [Demo](https://github.com/A-bahaa/Sharify-Documentation#demo)
 - [Preview](https://github.com/A-bahaa/Sharify-Documentation#preview)
 - [Future Work](https://github.com/A-bahaa/Sharify-Documentation#future-work) 
 
 
 ## Motivation
 
 **I've always loved the Spotify wrapped** at the end of the year to get reminded of my `top tracks` and `artists` of the year. What's even more fun is sharing your top tracks and artists with your friends. 
 
 **Sadly, Spotify Wrapped comes out only once a year**, so I thought it would be fun to build a tool that gets your Spotify `top tracks` and `artist` of the last month all year and allows us music freaks to share, preview and save these tracks seamlessly.
 
 **Another thing I always wished that Spotify allows sharing** is your `liked tracks` In your library. Currently, you can't share them or even save them to a separate playlist.
 
 ## Capabilties
 
### **Sharify offers the following :**
- Get your `top tracks` and `artists` from your last month on Spotify.
- Get your all-time `liked tracks` on your Spotify library.
- Preview your `top tracks`, `top artists`, and `liked tracks` seamlessly on Sharify.
- Save and remove specific tracks to your Spotify library.
- Follow and Unfollow specific artists.
- Sort different tracks on the release date, popularity, and affinity.
- Sort different artists on affinity and popularity.
- Save your `top tracks` from last month to a separate playlist on your Spotify library.
- Save your `liked tracks` from last month to a separate playlist on your Spotify library.
- Share your `top tracks`, `top artists`, and `liked tracks`. Sharing is achieved by generating a preview link that your friends could open to preview and save your top tracks, top artists, and liked tracks seamlessly.
- Preview link works with any user even if they're not registered on Sharify.


## Product Design

<p align="center"> 
  <img src="https://user-images.githubusercontent.com/65967989/233859149-7caa24cc-534e-41cc-a0c6-d5d064a2cc21.png" />
</p>

**I'll sum up the most important design thoughts in the following points :**

- The tracks are displayed in wide cards inside a n*4 grid to embrace the ease of use and add an aesthetic look to the page.
- The logo is inspired by the DJ CDs. it even has a rotate animation to mimic the movement of the DJ CDs 
- I used the same Circular fonts that Spotify use along with their heart icons to add familiarity to the user experience.
- The preview zone is placed on the left side to inform the user about the current card they're hovering on along with some info about it like the genre, release date, and the popularity measurement.
- the background color of the preview zone gets changed as the user hovers over different cards to mimic a very known Spotify practice.




## Auth

**How Sharify Authorizes the users?**

- Spotify offers different options to authorize users, but since Sharify is a serverless app, I went with the Implicit Grant Flow. 
<p align="center"> 
  <img src="https://user-images.githubusercontent.com/65967989/233858341-717911a2-a728-475e-9206-c8fbd3ee11e7.png" />
</p>


- The implicit grant flow is carried out on the client side and it does not involve secret keys. Thus, you do not need any server-side code to use it. Access tokens issued are short-lived with no refresh token to extend them when they expire.

- Once the access token is expired, the user gets prompted with a modal to refresh the access token.

<p align="center"> 
  <img src="https://user-images.githubusercontent.com/65967989/233858332-ad34b5f3-7fea-42c1-92fb-3b6f55926c03.png" />
</p>

## How to gain Access ?

**Currently**, the app on development mode and only 25 people can log in and try it out but the generated sharing links is available for any number of users.

To gain access to Sharify reach out to me on [Instagram](https://www.instagram.com/ghonimzz/) .


## Demo 

**As stated above** the generated preview links are available to any number of viewers, so here are my [Top Tracks](https://sharify-gh.netlify.app/TopTracks?id=6445850d1394f9ebb95f670d) as recorded on Apr 23 to get a glimpse of what Sharify has to offer.



## Preview
- The website is currently hosted on netlify at https://sharify-gh.netlify.app/

## Future work


