import React from 'react'
import styles from '../../styles/Main.module.css'
import animStyles from '../../styles/Animation.module.css'

export const SMA = () => {
  return (
    <div className={styles.smaCont}>
        {/* position: absolute;
    background: #642067;
    z-index: 2;
    margin-left: 21vw;
    padding-right: 10vw;
    width: 73vw;
    font-weight: 400; */}
        <div className="">
            <div style={{textAlign: 'end'}}>
                {/*     text-align: end;
    padding-top: 7vh; */}
                {/* font-weight: 400; */}
                <div className={`${styles.smaBig1} {animStyles.hiddenLeft}`}>What is your desired number of followers on Facebook? </div>
                <div className={`${styles.smaBig2} {animStyles.hiddenLeft}`}>And what about Instagram? </div>
                <div className={`${styles.smaBig3} {animStyles.hiddenLeft}`}>Or maybe LinkedIn? </div>

                <div className={styles.followers}>
                    {/* position: relative;
    top: 7vh;
    left: 21vw;
    width: fit-content;
    text-align: center;
    font-size: 2rem;
    padding: 1.17vw;
    border: 0.16vw solid #000; */}
                    2000 <br />
                    {/* ::before {
                            content: 'Seems nice right?';
    position: absolute;
    margin-left: -8vw;
    margin-top: -6vw;
    font-size: 1.5rem;
    text-transform: uppercase;
    color: rgb(0,0,0);
    width: 3.9vw;
    text-align: end;
    z-index: 8;
                    } */}
                    <span>Followers</span>
                </div>
                
                <div className={`${styles.comment} ${styles.smaComment}`}>
                    {/* position: relative;
    top: 10vh;
    margin-left: 32.96vw;
    width: 55%;
    color: #000;
    font-size: 1.5rem; */}
                    Or maybe you are just that one <br />
                who doesn’t believe in a magical power <br /> of the social networks?</div>
                
                <div className={`${styles.title1} ${styles.smaTitle1}`}> Well, well, well… </div>
                {/* color: #642067; */}
                <div className={`${styles.title2} ${styles.smaTitle2}`}>Let us prove you’re wrong!</div> 
            </div>
            <div className={styles.vidCont}>
                {/*     margin-top: 15vh;
                padding-bottom: 7.8vw;
    padding-right: 6.8vw;
    width: 101vw;
    padding-left: 9vw;
    background: #642067;
    box-sizing: border-box;
    margin-left: -21.3vw;
    display: flex;
    justify-content: flex-end;
    flex-direction: row-reverse; */}
                <div className={styles.vidTextCont}>
                    {/* flex: 50% 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 7.8vw; */}
                    <div className={styles.vidText}>
                        {/* font-size: 2rem;
    font-weight: 400;
    text-align: initial;
    position: relative;
    left: 2vw; */}
                        We promise, <br />
                        <span className={styles.underlineBlue}>you’ll be surprised</span> by how fast <br />
                        the number of followers you <span className={styles.underlineBlue}>used to desire for</span><br />
                        will become <span className={styles.underlineBlue}>just a half</span> of your achieved audience!
                    </div>
                </div>
                <div className={styles.vidWrap}>
                    {/*     overflow: hidden;
    height: 46vw;
    border-radius: 1.6vw;
    width: 27.3vw;
    position: relative;
    left: -3vw; */}
                    <video className={styles.smaVideo} src={require('../../assets/SMA.mp4')} autoPlay='autoplay' loop={true}></video>
                    {/*     width: 26.3vw;
    margin-top: -6vw;
    position: relative; */}
                </div>
            </div>
        </div>
    </div>
  )
}
