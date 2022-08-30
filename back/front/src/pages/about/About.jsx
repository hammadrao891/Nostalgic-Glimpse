import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./about.css"
const About = () => {
  return (
    <div>
      <Navbar/>
      <div className="top">
        <div className='web1'>
        <h1>Old Times</h1>
        <h3>time to get some nostalgia</h3>
        </div>
        <div className='para'>
        is a platform being created to help people have a look at the places they left at the time of partition.  
        </div>
        <div className='q'>
          <h1>how does it work?</h1>
          <p>Once a user gets registered he/she will be given a brief form where he/she has to choose her city/state before partition or city/state he/she want to look into<br/>Once the form is completed a list of available users will be shown and they can have a conversation <br/> with anyone they desire and get their WhatsApp number (if other allows)</p>
        </div>
        <div className='images'>
        <div class="row">
  <div class="column">
    <img src="https://i.guim.co.uk/img/media/552a25ea6c9abb2405d20f3877b5f0442f232a48/9_0_2978_1786/master/2978.jpg?width=620&quality=85&fit=max&s=da3c3f68c8c0c03727202c03aa429f19" alt="Snow" />
  </div>
  <div class="column">
    <img src="https://englishtribuneimages.blob.core.windows.net/gallary-content/2022/1/2022_1$largeimg_1440893988.jpg" alt="Forest" />
  </div>
  <div class="column">
    <img src="https://i.ytimg.com/vi/s5pIzavMx2A/mqdefault.jpg" alt="Mountains" />
  </div>
</div>
</div>
<footer className='footerz'>
          <div className='foo'>
            Contact for any sort of queries 000-1111-111-00</div>
        </footer>

      </div>
    </div>
  )
}

export default About
