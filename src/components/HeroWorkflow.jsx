import { useEffect, useRef, useState } from 'react';

const statusLabels = {
  idle: 'Ready to record',
  recording: 'Recording time',
  invoiceReady: 'Ready to invoice',
  generating: 'Generating invoice',
  complete: 'Invoice generated',
};

function HeroWorkflow() {
  const [stage, setStage] = useState('idle');
  const timerRef = useRef(null);

  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current);
    },
    [],
  );

  const advanceAfter = (nextStage, delay) => {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setStage(nextStage), delay);
  };

  const recordTime = () => {
    setStage('recording');
    advanceAfter('invoiceReady', 700);
  };

  const generateInvoice = () => {
    setStage('generating');
    advanceAfter('complete', 850);
  };

  const resetWorkflow = () => {
    window.clearTimeout(timerRef.current);
    setStage('idle');
  };

  const hasTime = stage !== 'idle';
  const hasInvoice = stage === 'generating' || stage === 'complete';

  return (
    <div className={`product-panel workflow-demo stage-${stage}`}>
      <div className="panel-topline">
        <span>Case-to-invoice workflow</span>
        <strong aria-live="polite">{statusLabels[stage]}</strong>
      </div>

      <div className="workflow-track">
        <section className={`workflow-node ${hasTime ? 'is-complete' : 'is-active'}`}>
          <span className="workflow-number">01</span>
          <div className="workflow-case-summary">
            <div className="workflow-case-copy">
              <p>Case work</p>
              <h2>Research and preparation</h2>
            </div>
            <div className="workflow-clock" aria-hidden="true">
              <div className="clock-face">
                {Array.from({ length: 12 }, (_, index) => (
                  <i className="clock-marker" style={{ '--marker': index }} key={index} />
                ))}
                <i className="clock-hand clock-hour" />
                <i className="clock-hand clock-minute" />
                <i className="clock-hand clock-second" />
                <i className="clock-pin" />
              </div>
              <span>Timer</span>
            </div>
          </div>
          <button
            className="workflow-action"
            type="button"
            onClick={recordTime}
            disabled={stage !== 'idle'}
          >
            Record
          </button>
        </section>

        <div className={`workflow-connector ${hasTime ? 'is-active' : ''}`} aria-hidden="true">
          <span />
        </div>

        <section className={`workflow-node ${stage === 'invoiceReady' ? 'is-active' : ''} ${hasInvoice ? 'is-complete' : ''}`}>
          <span className="workflow-number">02</span>
          <p>Uninvoiced time</p>
          <div className="time-bucket" aria-label={`${hasTime ? 2 : 0} hours ready for invoicing`}>
            <strong>{hasTime ? '2h' : '0h'}</strong>
            <span>{hasTime ? 'Recorded' : 'Waiting for time'}</span>
            {hasTime && <i className="time-token" aria-hidden="true">2h</i>}
          </div>
          <button
            className="workflow-action"
            type="button"
            onClick={generateInvoice}
            disabled={stage !== 'invoiceReady'}
          >
            Generate invoice
          </button>
        </section>
      </div>

      <div className={`invoice-result ${hasInvoice ? 'is-visible' : ''}`} aria-hidden={!hasInvoice}>
        {hasInvoice && (
          <>
            <div className="invoice-document" aria-hidden="true">
              <span>PDF</span>
              <i />
              <i />
              <i />
            </div>
            <div>
              <p>Invoice output</p>
              <strong>{stage === 'complete' ? 'Invoice generated' : 'Preparing document...'}</strong>
            </div>
            {stage === 'complete' && (
              <button className="workflow-reset" type="button" onClick={resetWorkflow}>
                Reset
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HeroWorkflow;
