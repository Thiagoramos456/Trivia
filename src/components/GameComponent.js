// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import Loading from './Loading';
// import Buttons from './Buttons';

// class GameComponent extends Component {
//   render() {
//     const { isLoading, results, answerTimeSeconds, getCleanText, enableNextQuestionButton,
//       timeIsOver, showNextButton, qIndex, goToNextQuestion, rightAnswer } = this.props;
//     console.log(results);
//     return (
//       <>
//         { results && (
//           <div>
//             <h1 data-testid="question-category">{results[qIndex].category}</h1>
//             <h2
//               data-testid="question-text"
//               dangerouslySetInnerHTML={ getCleanText(results[qIndex].question) }
//             />
//             <h3>
//               {`Tempo restante: ${answerTimeSeconds} segundos`}
//             </h3>
//             <ol>
//               {results[qIndex].incorrect_answers.map((answer, index) => (
//                 <li key={ index }>
//                   <Buttons
//                     disabled={ timeIsOver }
//                     testId={ `wrong-answer-${index}` }
//                     text={ answer }
//                     onClick={ () => enableNextQuestionButton(this.props) }
//                     style={ { border: timeIsOver && '3px solid rgb(255, 0, 0)' } }
//                   />
//                 </li>
//               ))}
//               <li>
//                 <Buttons
//                   disabled={ timeIsOver }
//                   testId="correct-answer"
//                   text={ results[qIndex].correct_answer }
//                   onClick={ () => rightAnswer(results, answerTimeSeconds) }
//                   style={ { border: timeIsOver && '3px solid rgb(6, 240, 15)' } }
//                 />
//               </li>
//             </ol>
//             {showNextButton
//               && <Buttons
//                 testId="btn-next"
//                 text="Próxima"
//                 onClick={ goToNextQuestion }
//               />}
//           </div>
//         )}
//         {isLoading && <Loading />}
//       </>
//     );
//   }
// }

// GameComponent.propTypes = {
//   answerTimeSeconds: PropTypes.number.isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   qIndex: PropTypes.number.isRequired,
//   results: PropTypes.objectOf(PropTypes.object).isRequired,
//   showNextButton: PropTypes.bool.isRequired,
//   timeIsOver: PropTypes.bool.isRequired,
// };

// export default connect()(GameComponent);

//         {/* <GameComponent
//           answerTimeSeconds={ answerTimeSeconds }
//           timeIsOver={ timeIsOver }
//           showNextButton={ showNextButton }
//           qIndex={ qIndex }
//           results={ results }
//           getCleanText={ this.getCleanText }
//           enableNextQuestionButton={ this.enableNextQuestionButton }
//           rightAnswer={ this.rightAnswer }
//           goToNextQuestion={ this.goToNextQuestion }

//         /> */}
