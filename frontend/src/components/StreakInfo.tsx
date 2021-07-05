interface StreakInfoProps {
  currentStreak: number;
}
const StreakInfo = ({ currentStreak }: StreakInfoProps) => (
  <>
    <p style={{ fontSize: '10px' }}>Streak</p>
    {currentStreak}
  </>
);

export default StreakInfo;
