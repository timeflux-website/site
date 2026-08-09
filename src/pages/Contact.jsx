import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero.jsx';

const quickAnswers = [
  {
    question: 'Who is TIMEFLUX for?',
    answer:
      'TIMEFLUX is built for law firms and legal teams that need a clearer way to manage case work, time recording, tasks, fees, invoicing, and reporting in one workspace.',
  },
  {
    question: 'What does TIMEFLUX help manage?',
    answer:
      'TIMEFLUX brings together cases, clients, tasks, time records, fees, invoices, planning, reporting, imports, exports, and guided assistant actions so day-to-day legal work stays connected.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'TIMEFLUX starts with a 3-month intro at £300 per user. If it proves useful, firms can move into an annual plan at £1,100 per user. Every user gets access to the platform without limited feature tiers.',
  },
  {
    question: 'Can I book a demo first?',
    answer:
      'Yes. If you would like to see TIMEFLUX before starting the intro plan, email hello@timeflux.co.uk and we can arrange a walkthrough.',
  },
  {
    question: 'Does TIMEFLUX replace my existing systems?',
    answer:
      'TIMEFLUX is designed to bring core legal work, time recording, billing, and reporting into one focused workspace. Depending on how your firm currently works, it may replace some tools or sit alongside existing systems using imports, exports, API access, and configured workflows.',
  },
  {
    question: 'How does onboarding work?',
    answer:
      'TIMEFLUX is designed to support both guided onboarding and self-onboarding. We can help set up firm details, users, case types, task workflows, fees, rates, and imports, or train your team to configure these areas themselves. The platform is flexible and configurable, so it can be shaped around how your firm works.',
  },
  {
    question: 'Can I test TIMEFLUX?',
    answer:
      'Yes. We are happy to provide free trial access so your team can explore TIMEFLUX directly before making a decision. Email hello@timeflux.co.uk and we can set this up right away.',
  },
];

function Contact() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAssistantAnswer, setShowAssistantAnswer] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');

  useEffect(() => {
    if (!selectedQuestion) {
      return undefined;
    }

    setShowAssistantAnswer(false);
    setTypedAnswer('');

    let typingInterval;
    const answerDelay = window.setTimeout(() => {
      const words = selectedQuestion.answer.split(' ');
      let wordIndex = 0;

      setShowAssistantAnswer(true);

      typingInterval = window.setInterval(() => {
        wordIndex += 1;
        setTypedAnswer(words.slice(0, wordIndex).join(' '));

        if (wordIndex >= words.length) {
          window.clearInterval(typingInterval);
        }
      }, 58);
    }, 520);

    return () => {
      window.clearTimeout(answerDelay);
      window.clearInterval(typingInterval);
    };
  }, [selectedQuestion]);

  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to us about TIMEFLUX.">
        Ask a product question, discuss how TIMEFLUX could fit your firm, or
        arrange to see the platform before starting.
      </PageHero>
      <section className="section">
        <div className="section-inner contact-panel">
          <div>
            <p className="eyebrow">Email</p>
            <h2>Start with an email.</h2>
            <p>
              Email us with product questions, demo requests, pricing queries,
              or general enquiries.
            </p>
          </div>
          <a className="button primary" href="mailto:hello@timeflux.co.uk">
            hello@timeflux.co.uk
          </a>
        </div>
      </section>
      <section className="section quick-answers-section">
        <div className="section-inner quick-answers">
          <div className="quick-answers-copy">
            <p className="eyebrow">Quick answers</p>
            <h2>Useful answers before you write.</h2>
            <p>
              Choose a question for a short answer. For anything more specific,
              email us and we will respond directly.
            </p>
          </div>

          <div className="quick-answer-shell" aria-live="polite">
            <div className="assistant-status">
              <span aria-hidden="true"></span>
              <strong>TIMEFLUX Assistant</strong>
            </div>
            <div className="question-list" aria-label="Common contact questions">
              {quickAnswers.map((item) => (
                <button
                  className={item.question === selectedQuestion?.question ? 'active' : ''}
                  key={item.question}
                  type="button"
                  onClick={() => setSelectedQuestion(item)}
                >
                  {item.question}
                </button>
              ))}
            </div>
            {selectedQuestion && (
              <div className="chat-thread" key={selectedQuestion.question}>
                <div className="chat-bubble user">
                  <span>You</span>
                  <p>{selectedQuestion.question}</p>
                </div>
                {showAssistantAnswer && (
                  <div className="chat-bubble assistant">
                    <span>TIMEFLUX</span>
                    <p>
                      {typedAnswer}
                      {typedAnswer !== selectedQuestion.answer && (
                        <span className="typing-cursor" aria-hidden="true"></span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
