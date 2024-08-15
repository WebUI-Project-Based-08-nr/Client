import { useEffect } from 'react'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import FindBlock from '~/components/find-block/FindBlock'

import { styles } from '~/pages/tutor-home/TutorHome.styles'
import { translationKey } from '~/components/find-block/find-student-constants'
import HowItWorks from '~/containers/student-home-page/student-how-it-works/how-it-works/HowItWorks'
import PopularCategories from '~/components/popular-categories/PopularCategories'

const TutorHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: styles.modal
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <PageWrapper data-testid='tutorHome'>
      <FindBlock translationKey={translationKey} />
      <PopularCategories />
      <HowItWorks userRole={userRole} />
    </PageWrapper>
  )
}

export default TutorHome
