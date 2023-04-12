import ReactLoading from 'react-loading';
export default function Loading({isLoading}) {
  return <>
    {isLoading && (
      <div
    style= {{
      position:'fixed',
      top:0,
      bottom: 0,
      left: 0,
      right: 0,
      background:'rgba(0,0,0,0.5)',
      zIndex:10000,
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
    <ReactLoading type="balls" color="white" height={65} width={100} />
    </div>        
    )}
  
  </>
}