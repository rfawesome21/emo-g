import React from 'react'
import tippy from 'tippy.js';
import {roundArrow} from 'tippy.js';
import 'tippy.js/dist/svg-arrow.css';
import { useEffect } from 'react';

const Wheel2 = ({ emotionFunction, currentRoundEmotion, deletedRow, callRobot }) => {

    console.log(callRobot);

  if(!callRobot || callRobot[0]===''){
    callRobot=undefined
  }

  if (!deletedRow || deletedRow.length===0){
    deletedRow=["", "", ""]
  }

    useEffect(() => {
            tippy('#ecstacy', {
                content: 'Xtacy definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#admiration', {
                content: 'admiration definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#sadness', {
                content: 'sadness definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#pensiveness', {
                content: 'pensiveness definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#joy', {
                content: 'joy definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#serenity', {
                content: 'serenity definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#acceptance', {
                content: 'acceptance definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#trust', {
                content: 'trust definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#anticipation', {
                content: 'anticipation definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#anger', {
                content: 'anger definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#disgust', {
                content: 'disgust definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#surprise', {
                content: 'surprise definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#distraction', {
                content: 'distraction definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#boredom', {
                content: 'boredom definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#fear', {
                content: 'fear definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#apprehension', {
                content: 'apprehension definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#annoyance', {
                content: 'annoyance definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#interest', {
                content: 'interest definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#terror', {
                content: 'terror definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#amazement', {
                content: 'amazement definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#grief', {
                content: 'grief definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#loathing', {
                content: 'loathing definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#rage', {
                content: 'rage definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#vigilance', {
                content: 'vigilance definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#love', {
                content: 'love definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#submission', {
                content: 'submission definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#awe', {
                content: 'awe definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#disapproval', {
                content: 'disapproval definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#remorse', {
                content: 'remorse definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#contempt', {
                content: 'contempt definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#aggressiveness', {
                content: 'aggressiveness definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#optimism', {
                content: 'optimism definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
    }, [])

    return ( 
    <div style={{width:"500px"}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 548 548">

            <g id="Layer_2" data-name="Layer 2">

            <path className={currentRoundEmotion && currentRoundEmotion!=="ACCEPTANCE"?"disabled":"acceptance"} d="M438.54,181.31a191.59,191.59,0,0,0-71.82-72.81l19.43-46.9a23.92,23.92,0,0,0,.94-2.74A245.9,245.9,0,0,1,489,160.61a23.2,23.2,0,0,0-2.7.92Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="TRUST"?"disabled":"trust"} d="M384.61,219.12a124.68,124.68,0,0,0-56-55.87H329a22.46,22.46,0,0,0,20.79-13.89l15.38-37.15a187.74,187.74,0,0,1,69.64,70.63l-36.32,15a22.56,22.56,0,0,0-13.89,21.23Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="ADMIRATION"?"disabled":"admiration stroke"} d="M321.89,164.53a120.43,120.43,0,0,1,61.86,62.23L278,270.57Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="SERENITY"?"disabled":"serenity"} d="M325.34,90.82A192.24,192.24,0,0,0,221.8,89.63L203.11,44.5a23.29,23.29,0,0,0-1.29-2.6,244.49,244.49,0,0,1,144-.11,21.43,21.43,0,0,0-1.27,2.59Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="JOY"?"disabled":"joy"} d="M234.28,157.08a22.64,22.64,0,0,0,5.19-24.81L223.35,93.35A188.44,188.44,0,0,1,323.8,94.53l-15.58,37.61A22.57,22.57,0,0,0,313.38,157a123.94,123.94,0,0,0-79.1.12Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="ECSTACY"?"disabled":"ecstacy"} d="M230.27,162.81a119.79,119.79,0,0,1,87.93.18L274.27,269Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="INTEREST"?"disabled":"interest"} d="M61.6,161.85a24.6,24.6,0,0,0-2.74-.94A245.9,245.9,0,0,1,160.61,59a23.2,23.2,0,0,0,.92,2.7L180,106.36a191.35,191.35,0,0,0-74.84,73.54Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="ANTICIPATION"?"disabled":"anticipation"} d="M163.25,219.41a22.58,22.58,0,0,0-13.88-21.21L108.9,181.45a187.38,187.38,0,0,1,72.66-71.38l16.33,39.43a22.43,22.43,0,0,0,20.79,13.89h.45A124.6,124.6,0,0,0,163.25,219.41Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="VIGILANCE"?"disabled":"vigilance"} d="M164.34,226.57a120.26,120.26,0,0,1,62.23-62.23l44,106.23Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="APPREHENSION"?"disabled":"apprehension"} d="M506.21,345.84a21.43,21.43,0,0,0-2.59-1.27l-47.76-19.78a192.19,192.19,0,0,0-.22-101.85l47.86-19.83a23.29,23.29,0,0,0,2.6-1.29,244.49,244.49,0,0,1,.11,144Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="TERROR"?"disabled":"terror"} d="M279.5,274.27l105.77-43.81a119.83,119.83,0,0,1-.18,87.54Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="FEAR"?"disabled":"fear"} d="M415.86,308.22A22.5,22.5,0,0,0,391,313.38a123.94,123.94,0,0,0-.11-79.07,22.56,22.56,0,0,0,16.2,6.87,22.32,22.32,0,0,0,8.59-1.71l36.2-15a188.35,188.35,0,0,1,.22,98.77Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="DISTRACTION"?"disabled":"distraction"} d="M387.39,489a23.2,23.2,0,0,0-.92-2.7L367.2,439.76a191.57,191.57,0,0,0,71.74-73.26l47.46,19.65a23.92,23.92,0,0,0,2.74.94A245.9,245.9,0,0,1,387.39,489Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="AMAZEMENT"?"disabled":"amazement"} d="M278,278,383.55,321.7a120.53,120.53,0,0,1-61.85,61.85Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="SURPRISE"?"disabled":"surprise"} d="M350.11,398.5a22.43,22.43,0,0,0-20.79-13.89h-.45a124.76,124.76,0,0,0,55.9-56.06,22.61,22.61,0,0,0,13.86,21.24L435.23,365A187.71,187.71,0,0,1,365.66,436Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="PENSIVENESS"?"disabled":"pensiveness"} d="M274,517a243,243,0,0,1-71.84-10.79,21.43,21.43,0,0,0,1.27-2.59l18.5-44.68a192.34,192.34,0,0,0,103.93-1.36l19,45.92a23.29,23.29,0,0,0,1.29,2.6A243,243,0,0,1,274,517Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="GRIEF"?"disabled":"grief"} d="M274,393.46a118.59,118.59,0,0,1-43.54-8.19L274.27,279.5,318,385.09A118.75,118.75,0,0,1,274,393.46Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="SADNESS"?"disabled":"sadness"} d="M271.46,461.43a187.45,187.45,0,0,1-48-6.21l16.3-39.36a22.58,22.58,0,0,0-5.2-24.83,124.06,124.06,0,0,0,79.11-.09,22.54,22.54,0,0,0-5.16,24.79l15.8,38.13A187.41,187.41,0,0,1,271.46,461.43Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="BOREDOM"?"disabled":"boredom"} d="M160.91,489.14A245.9,245.9,0,0,1,59,387.39a23.2,23.2,0,0,0,2.7-.92l43.37-18a191.26,191.26,0,0,0,75,73.74L161.85,486.4A23.92,23.92,0,0,0,160.91,489.14Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="LOATHING"?"disabled":"loathing"} d="M226.76,383.75a120.37,120.37,0,0,1-62.22-61.86l106-43.92Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="DISGUST"?"disabled":"disgust"} d="M181.68,438.53A187.32,187.32,0,0,1,108.82,367l40.68-16.84a22.58,22.58,0,0,0,13.87-21.26,124.7,124.7,0,0,0,56,55.89H219a22.46,22.46,0,0,0-20.8,13.89Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="ANNOYANCE"?"disabled":"annoyance"} d="M41.9,346.18a244.49,244.49,0,0,1-.11-144,21.43,21.43,0,0,0,2.59,1.27l43.34,17.95a192.17,192.17,0,0,0,0,105.63L44.5,344.89A23.29,23.29,0,0,0,41.9,346.18Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="RAGE"?"disabled":"rage"} d="M163,318.2a119.79,119.79,0,0,1-.18-87.93l106.23,44Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="ANGER"?"disabled":"anger"} d="M91.4,325.47a188.19,188.19,0,0,1,0-102.55l40.7,16.86A22.48,22.48,0,0,0,157,234.61a124.06,124.06,0,0,0,.09,79.05,22.52,22.52,0,0,0-24.77-5.13Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="OPTIMISM"?"disabled":"optimism"} d="M218.68,159.39A18.43,18.43,0,0,1,201.59,148L165.23,60.19a18.44,18.44,0,0,1,10-24.16,18.29,18.29,0,0,1,7.07-1.42A18.5,18.5,0,0,1,199.41,46l36.36,87.77a18.55,18.55,0,0,1-9.75,24l-.1,0-.09.05A18.5,18.5,0,0,1,218.68,159.39Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="AGGRESSIVENESS"?"disabled":"aggressiveness"} d="M140.75,237.5a18.41,18.41,0,0,1-7.08-1.42L45.91,199.73A18.51,18.51,0,0,1,53,164.13a19.64,19.64,0,0,1,2.61.18,18.5,18.5,0,0,1,4.46,1.24l87.77,36.35a18.52,18.52,0,0,1,10,24.12l-.16.34v.06A18.44,18.44,0,0,1,140.75,237.5Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="CONTEMPT"?"disabled":"contempt"} d="M53.14,384.19a18.5,18.5,0,0,1-7.1-35.6l87.77-36.36a18.48,18.48,0,0,1,24.13,9.95l.1.22a18.54,18.54,0,0,1-10.08,24L105.2,364.12l-45,18.65A18.53,18.53,0,0,1,55.74,384,18.84,18.84,0,0,1,53.14,384.19Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="REMORSE"?"disabled":"remorse"} d="M182.63,513.52A18.55,18.55,0,0,1,164.13,495a19.64,19.64,0,0,1,.18-2.61,18.5,18.5,0,0,1,1.24-4.46l36.35-87.77a18.46,18.46,0,0,1,24.17-10l.15.06a18.53,18.53,0,0,1,9.86,24.1l-36.35,87.77a18.47,18.47,0,0,1-17.1,11.43Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="DISAPPROVAL"?"disabled":"disapproval"} d="M365.68,513.39A18.5,18.5,0,0,1,348.59,502l-19.72-47.59-16.64-40.18a18.51,18.51,0,0,1,9.64-24h.45l.3-.31A18.46,18.46,0,0,1,346.41,400l36.36,87.78a18.44,18.44,0,0,1-10,24.16A18.33,18.33,0,0,1,365.68,513.39Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="AWE"?"disabled":"awe"} d="M495,383.87a19.64,19.64,0,0,1-2.61-.18,18.5,18.5,0,0,1-4.46-1.24L400.17,346.1a18.55,18.55,0,0,1-10.11-23.9l0-.08,0-.08.06-.13a18.46,18.46,0,0,1,24.16-10l87.76,36.35a18.51,18.51,0,0,1-7.08,35.6Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="SUBMISSION"?"disabled":"submission"} d="M407.13,237.18a18.5,18.5,0,0,1-16.91-11l-.18-.4a18.49,18.49,0,0,1,10-24.2l87.78-36.36a18.53,18.53,0,0,1,4.45-1.23,18.84,18.84,0,0,1,2.6-.19,18.5,18.5,0,0,1,7.1,35.6l-49.5,20.51-38.27,15.85A18.27,18.27,0,0,1,407.13,237.18Z"/>
            <path className={currentRoundEmotion && currentRoundEmotion!=="LOVE"?"disabled":"love"} d="M329,159.26a18.28,18.28,0,0,1-6.64-1.25l-.41-.15a18.52,18.52,0,0,1-10-24.18L328.35,94l19.92-48.11a18.47,18.47,0,0,1,17.1-11.43A18.55,18.55,0,0,1,383.87,53a19.64,19.64,0,0,1-.18,2.61,18.5,18.5,0,0,1-1.24,4.46L346.1,147.83A18.44,18.44,0,0,1,329,159.26Z"/>

            </g>


            <g id="Layer_3" data-name="Layer 3">

            <text class="cls-33" transform="translate(277.24 239.42) rotate(-90)">
            ECSTACY
            </text>

            <text class="cls-33" transform="translate(294.3 256.85) rotate(-45)">
            ADMIRATION
            </text>

            <text class="cls-33" transform="translate(313.55 280.16)">
            TERROR
            </text>

            <text class="cls-33" transform="translate(179.45 58.8) rotate(68.04)">
            OPTIMISIM
            </text>

            <text class="cls-43" transform="translate(346.87 109.7) rotate(-65)">
            LOVE
            </text>

            <text class="cls-33" transform="translate(410.37 220.21) rotate(-22)">
            SUBMISSION
            </text>

            <text class="cls-33" transform="translate(425.48 339.46) rotate(22.5)">
            AWE
            </text>

            <text class="cls-33" transform="translate(324.91 404.88) rotate(70)">
            DISAPPROVAL
            </text>

            <text class="cls-33" transform="translate(194.1 480.51) rotate(-70)">
            REMORSE
            </text>

            <text class="cls-33" transform="translate(63.06 363.99) rotate(-20)">
            CONTEMPT
            </text>

            <text class="cls-33" transform="translate(46.11 180.91) rotate(25)">
            AGGRESSIVENESS
            </text>

            <text class="cls-33" transform="translate(270.69 320.17) rotate(90)">
            GRIEF
            </text>

            <text class="cls-33" transform="translate(211 348.47) rotate(-45)">
            LOATHING
            </text>

            <text class="cls-33" transform="translate(197.89 280.16)">
            RAGE
            </text>

            <text class="cls-33" transform="translate(198.55 203.27) rotate(45)">
            VIGILANCE
            </text>

            <text class="cls-33" transform="translate(289.11 291.54) rotate(45)">
            AMAZEMENT
            </text>

            <text class="cls-33" transform="translate(363.84 148.11) rotate(45)">
            TRUST
            </text>

            <text class="cls-33" transform="translate(393.34 89.61) rotate(45)">
            ACCEPTANCE
            </text>

            <text class="cls-33" transform="translate(261.36 120.77)">
            JOY
            </text>

            <text class="cls-33" transform="translate(245.36 59.77)">
            SERENITY
            </text>

            <text class="cls-33" transform="translate(422.85 257.61) rotate(90)">
            FEAR
            </text>

            <text class="cls-33" transform="translate(490.85 225.61) rotate(90)">
            APPREHENSION
            </text>

            <text class="cls-33" transform="translate(367.6 415.06) rotate(-45)">
            SURPRISE
            </text>

            <text class="cls-33" transform="translate(399.65 460.05) rotate(-45)">
            DISTRACTION
            </text>

            <text class="cls-55" transform="translate(241.36 437.77)">
            SADNESS
            </text>

            <text class="cls-33" transform="translate(225.36 496.77)">
            PENSIVENESS
            </text>

            <text class="cls-33" transform="translate(140.06 372.41) rotate(45)">
            DISGUST
            </text>

            <text class="cls-33" transform="translate(92.06 402.41) rotate(45)">
            BOREDOM
            </text>

            <text class="cls-33" transform="translate(127.51 301.25) rotate(-90)">
            ANGER
            </text>

            <text class="cls-33" transform="translate(61.51 315.25) rotate(-90)">
            ANNOYANCE
            </text>

            <text class="cls-33" transform="translate(102.71 140.76) rotate(-45)">
            INTEREST
            </text>

            <text class="cls-58" transform="translate(126.76 186.86) rotate(-45)">
            ANTICIPATION
            </text>

            </g>

        </svg>
    </div>
     );
}
 
export default Wheel2;