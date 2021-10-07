const Emotions = [['RAGE','ANGER'],['ANGER', 'ANNOYANCE'], ['LOATHING', 'DISGUST'], ['DISGUST', 'BOREDOME'], ['ADMIRATION', 'TRUST']
                , ['TRUST', 'ACCEPTANCE'], ['TERROR', 'FEAR'], ['FEAR', 'APPREHENSION'], ['AMAZEMENT', 'SURPRISE'], ['SURPRISE', 'DISTRACTION'],
                ['GRIEF', 'SADNESS'], ['SADNESS', 'PENSIVENESS'], ['VIGILANCE', 'ANTICIPATION'], ['ANTICIPATION', 'INTEREST'], ['ECSTACY','JOY'], ['JOY', 'SERENITY']]

const CompoundEmotions = ['AGGRESSIVENESS','CONTEMPT', 'REMORSE', 'DISAPPROVAL', 'AWE', 'SUBMISSION', 'LOVE','OPTIMISM']

const EmotionsAccordingToColor = [{
    emotion : 'RAGE',
    color : 'DarkIshRed',
    colorTwo : 'Red'
},
{
    emotion : 'ANGER',
    color : 'LightRed',
    colorTwo : 'Red'
},{
    emotion : 'ANNOYANCE',
    color : 'LightRed',
    colorTwo : 'Reddish'
},{
    emotion : 'VIGILANCE',
    color : 'DarkishOrange',
    colorTwo : 'Orange'
},{
    emotion : 'ANTICIPATION',
    color : 'LightOrange',
    colorTwo : 'Orange'
},{
    emotion : 'INTEREST',
    color : 'LightOrange',
    colorTwo : 'O'
},{
    emotion : 'ECSTACY',
    color : 'DarkIshYellow',
    colorTwo : 'Yellow'
},{
    emotion : 'JOY',
    color : 'LightYellow',
    colorTwo : 'Yellow'
},{
    emotion : 'SERENITY',
    color : 'LightYellow',
    colorTwo : 'Y'
},{
    emotion : 'ADMIRATION',
    color : 'DarkIshGreen',
    colorTwo : 'Green'
},{
    emotion : 'TRUST',
    color : 'LightGreen',
    colorTwo : 'Green'
},{
    emotion : 'ACCEPTANCE',
    color : 'LightGreen',
    colorTwo : 'G'
},{
    emotion : 'TERROR',
    color : 'DarkIshCyan',
    colorTwo : 'Cyan'
},{
    emotion : 'FEAR',
    color : 'LightCyan',
    colorTwo : 'Cyan'
},{
    emotion : 'APPREHENSION',
    color : 'LightCyan',
    colorTwo : 'C'
},{
    emotion : 'AMAZEMENT',
    color : 'DarkIshBlue',
    colorTwo : 'Blue'
},{
    emotion : 'SURPRISE',
    color : 'LightBlue',
    colorTwo : 'Blue'
},{
    emotion : 'DISTRACTION',
    color : 'LightBlue',
    colorTwo : 'B'
},{
    emotion : 'GRIEF',
    color : 'DarkIshPurple',
    colorTwo : 'Purple'
},{
    emotion : 'SADNESS',
    color : 'LightPurple',
    colorTwo : 'Purple'
},{
    emotion : 'PENSIVENESS',
    color : 'LightPurple',
    colorTwo : 'P'
},{
    emotion : 'LOATHING',
    color : 'DarkishViolet',
    colorTwo : 'Violet'
},{
    emotion : 'DISGUST',
    color : 'LightViolet',
    colorTwo : 'Violet'
},{
    emotion : 'BOREDOME',
    color : 'LightViolet',
    colorTwo : 'V'
}]


module.exports = {Emotions, CompoundEmotions, EmotionsAccordingToColor}