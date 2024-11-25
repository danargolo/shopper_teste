import { useRenderContext } from '../../context/renderContext';
import './styles.css'

export const Loader = () => {
  const { isLoading } = useRenderContext();

  return (
    <>
    <div className="loader">
      <div className="dbl-spinner"></div>
      <div className="dbl-spinner dbl-spinner--2"></div>
    </div>
    <p>{isLoading.message}</p>
    </>
  )
};
