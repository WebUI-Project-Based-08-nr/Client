import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Typography from '@mui/material/Typography'

import { tabsData } from '~/pages/my-resources/MyResources.constants'
import { styles } from '~/pages/my-resources/MyResources.styles'
import TabNavigation from '~/components/tab-navigation/TabNavigation'
import LessonList from '~/containers/my-resources/lesson-list/LessonList'
import QuizList from '~/containers/my-resources/quiz-list/QuizList'

const MyResources = () => {
  const [activeTab, setActiveTab] = useState<string>('lessons')
  const { t } = useTranslation()

  const handleClick = (tab: string) => {
    setActiveTab(tab)
  }

  const tabContent = activeTab && tabsData[activeTab].content

  return (
    <PageWrapper>
      <Typography sx={styles.title}>{t(tabsData[activeTab].title)}</Typography>
      <TabNavigation
        activeTab={activeTab}
        handleClick={handleClick}
        sx={styles.tabs}
        tabsData={tabsData}
      />
      {tabContent}
      {activeTab === 'lessons' && <LessonList />}
      {activeTab === 'quizzes' && <QuizList />}
    </PageWrapper>
  )
}

export default MyResources
