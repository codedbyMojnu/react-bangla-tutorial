import React, { useState, useEffect } from 'react';
import { useLearning } from './LearningContext';
import styles from './ProgressDashboard.module.css';

interface ProgressDashboardProps {
  className?: string;
}

export default function ProgressDashboard({ className }: ProgressDashboardProps) {
  const { state } = useLearning();
  const { progress } = state;
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const progressToNextLevel = ((progress.totalPoints % 1000) / 1000) * 100;
  const pointsToNextLevel = 1000 - (progress.totalPoints % 1000);

  return (
    <div className={`${styles.dashboard} ${className || ''} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          🎯 আপনার অগ্রগতি <span className={styles.titleEn}>(Your Progress)</span>
        </h2>
      </div>

      <div className={styles.statsGrid}>
        {/* Level & Points */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏆</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>Level {progress.currentLevel}</div>
            <div className={styles.statLabel}>
              {progress.totalPoints} পয়েন্ট
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
            <div className={styles.progressText}>
              পরবর্তী লেভেলে আরো {pointsToNextLevel} পয়েন্ট দরকার
            </div>
          </div>
        </div>

        {/* Completed Lessons */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📚</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{progress.completedLessons.length}</div>
            <div className={styles.statLabel}>
              সম্পন্ন পাঠ <span className={styles.labelEn}>(Completed Lessons)</span>
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🔥</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{progress.streakDays}</div>
            <div className={styles.statLabel}>
              দিনের ধারাবাহিকতা <span className={styles.labelEn}>(Day Streak)</span>
            </div>
          </div>
        </div>

        {/* Time Spent */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏱️</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{Math.floor(progress.timeSpent / 60)}h {progress.timeSpent % 60}m</div>
            <div className={styles.statLabel}>
              মোট সময় <span className={styles.labelEn}>(Total Time)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      {progress.achievements.filter(a => a.unlocked).length > 0 && (
        <div className={styles.achievementsSection}>
          <h3 className={styles.sectionTitle}>
            🏅 সাম্প্রতিক অর্জন <span className={styles.titleEn}>(Recent Achievements)</span>
          </h3>
          <div className={styles.achievementsList}>
            {progress.achievements
              .filter(a => a.unlocked)
              .slice(-3)
              .map(achievement => (
                <div key={achievement.id} className={styles.achievement}>
                  <span className={styles.achievementIcon}>{achievement.icon}</span>
                  <div className={styles.achievementContent}>
                    <div className={styles.achievementTitle}>
                      {achievement.titleBn}
                    </div>
                    <div className={styles.achievementDesc}>
                      {achievement.descriptionBn}
                    </div>
                    <div className={styles.achievementPoints}>
                      +{achievement.points} পয়েন্ট
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Next Milestone */}
      <div className={styles.milestoneSection}>
        <h3 className={styles.sectionTitle}>
          🎯 পরবর্তী লক্ষ্য <span className={styles.titleEn}>(Next Milestone)</span>
        </h3>
        <div className={styles.milestone}>
          {progress.completedLessons.length < 5 ? (
            <div className={styles.milestoneContent}>
              <span className={styles.milestoneIcon}>🌱</span>
              <div>
                <div className={styles.milestoneTitle}>React Novice অর্জন করুন</div>
                <div className={styles.milestoneDesc}>
                  আরো {5 - progress.completedLessons.length} পাঠ সম্পন্ন করুন
                </div>
              </div>
            </div>
          ) : progress.completedLessons.length < 10 ? (
            <div className={styles.milestoneContent}>
              <span className={styles.milestoneIcon}>🏗️</span>
              <div>
                <div className={styles.milestoneTitle}>Component Master হন</div>
                <div className={styles.milestoneDesc}>
                  আরো {10 - progress.completedLessons.length} পাঠ সম্পন্ন করুন
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.milestoneContent}>
              <span className={styles.milestoneIcon}>🚀</span>
              <div>
                <div className={styles.milestoneTitle}>আপনি দারুণ করছেন! </div>
                <div className={styles.milestoneDesc}>
                  React এর উন্নত বিষয়গুলো শেখা চালিয়ে যান
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}