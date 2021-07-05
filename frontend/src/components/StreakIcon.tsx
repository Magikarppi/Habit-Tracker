import PartyEmoji from '../images/partyFaceEmoji.png';
import FlameEmoji from '../images/flameEmoji.png';
import CrownEmoji from '../images/crown.svg';
import HundredEmoji from '../images/hundredEmoji.svg';

interface StreakIconProps {
  iconName: 'flame' | 'party' | 'crown' | 'hundred';
}

const StreakIcon = ({ iconName }: StreakIconProps) => {
  switch (iconName) {
    case 'flame':
      return (
        <img src={FlameEmoji} alt="flame-emoji" width="100%" height="100%" />
      );
    case 'party':
      return (
        <img src={PartyEmoji} alt="party-emoji" width="100%" height="100%" />
      );
    case 'crown':
      return (
        <img src={CrownEmoji} alt="crown-emoji" width="100%" height="100%" />
      );
    case 'hundred':
      return (
        <img src={HundredEmoji} alt="crown-emoji" width="100%" height="100%" />
      );
    default:
      return null;
  }
};

export default StreakIcon;
