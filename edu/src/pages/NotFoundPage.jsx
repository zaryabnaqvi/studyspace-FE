import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className='notFoundDiv min-h-screen'>

        <main className="bsod container-nfp notFound">
            <h1 className="neg title"><span className="bg uppercase">Error — 404</span></h1>
            <p>An error has occured, to continue:</p>
            <p>* Return to the homepage.<br />
                * Send us an e-mail about this error and try later.</p>
            <nav className="nav">
                <Link to="/" className="link">home</Link>&nbsp;|&nbsp;<Link to="/resources" className="link">resources</Link>
            </nav>
        </main>

        </div>

    )
}

export default NotFoundPage

/*
@import "https://fonts.googleapis.com/css?family=VT323";
body,
h1,
h2,
h3,
h4,
p,
a {
  @apply text-[#e0e2f4];
}
body,
p {
  font: normal 20px/1.25rem "VT323", monospace;
}
h1 {
  font: normal 2.75rem/1.05em "VT323", monospace;
}
h2 {
  font: normal 2.25rem/1.25em "VT323", monospace;
}
h3 {
  font: lighter 1.5rem/1.25em "VT323", monospace;
}
h4 {
  font: lighter 1.125rem/1.2222222em "VT323", monospace;
}
body {
  background: #ef4444;
}
.container {
  @apply w-[90%] max-w-screen-sm m-auto;
}
.bsod {
  @apply pt-[10%];
}
.bsod .neg {
  @apply text-center text-[#ef4444];
}
.bsod .neg .bg {
  @apply pl-[13px] pr-[15px] pt-0 pb-0.5;
  background: #aaa;
}
.bsod .title {
  @apply mb-[50px];
}
.bsod .nav {
  @apply text-center mt-[35px];
}
.bsod .nav .link {
  @apply no-underline pl-2 pr-[9px] pt-0 pb-0.5;
}
.bsod .nav .link:hover,
.bsod .nav .link:focus {
  @apply text-[#ef4444];
  background: #aaa;
}
  */
