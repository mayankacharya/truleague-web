const fs=require('fs');
const path='src/components/GrowEnrollment.css';
const text=fs.readFileSync(path,'utf8');
const marker='@media (max-width: 600px)';
const index=text.indexOf(marker);
if(index===-1){throw new Error('marker not found');}
const prefix=text.slice(0,index);
const newBlock=`@media (max-width: 600px) {
  .grow-enrollment {
    padding: 1.5rem 0 3rem;
  }

  .grow-enrollment__blocks {
    gap: 2rem;
    padding-bottom: 1rem;
  }

  .grow-block {
    width: min(360px, 88vw);
    margin: 0 auto 1.5rem;
    padding: 2.25rem 1.5rem 2.75rem;
    background: linear-gradient(180deg, #e1e4ff 0%, #dbd1ff 55%, #f3e7ff 100%);
    border-radius: 36px;
    box-shadow: 0 25px 55px rgba(38, 8, 97, 0.28);
    grid-template-columns: 1fr;
    text-align: center;
    min-height: 0;
    position: relative;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
