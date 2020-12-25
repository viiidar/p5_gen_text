function setup() {
  my_sketch = createCanvas(1200, 800)
  my_sketch.parent("my_sketch");
  frameRate(0.2)
  Parole = new p5.Speech();
  Parole.setLang('de-DE')
}

var input = "Chanter Adamastor, Jocelyn, Rocambole, c’est puéril. Ce n’est même que parce que l’auteur espère que le lecteur sous-entend qu’il pardonnera à ses héros fripons, qu’il se trahit lui-même et s’appuie sur le bien pour faire passer la description du mal. C’est au nom de ces mêmes vertus que Frank a méconnues, que nous voulons bien le supporter, ô saltimbanques des malaises incurables. Ne faites pas comme ces explorateurs sans pudeur, magnifiques, à leurs yeux, de mélancolie, qui trouvent des choses inconnues dans leur esprit et dans leur corps ! La mélancolie et la tristesse sont déjà le commencement du doute ; le doute est le commencement du désespoir ; le désespoir est le commencement cruel des différents degrés de la méchanceté. Pour vous en convaincre, lisez la Confession d’un enfant du siècle. La pente est fatale, une fois qu’on s’y engage. Il est certain qu’on arrive à la méchanceté. Méfiez-vous de la pente. Extirpez le mal par la racine. Ne flattez pas le culte d’adjectifs tels que indescriptible, inénarrable, rutilant, incomparable, colossal, qui mentent sans vergogne aux substantifs qu’ils défigurent ils sont poursuivis par la lubricité. Les intelligences de deuxième ordre, comme Alfred de Musset, peuvent pousser rétivement une ou deux de leurs facultés beaucoup plus loin que les facultés correspondantes des intelligences de premier ordre, Lamartine, Hugo. Nous sommes en présence du déraillement d’une locomotive surmenée. C’est un cauchemar qui tient la plume. Apprenez que l’âme se compose d’une vingtaine de facultés. Parlez-moi de ces mendiants qui ont un chapeau grandiose, avec des haillons sordides ! Voici un moyen de constater l’infériorité de Musset sous les deux poètes. Lisez, devant une jeune fille, Rolla ou les Nuits, les Fous de Cobb, sinon les portraits de Gwynplaine et de Dea, ou le Récit de Théramène d’Euripide, traduit en vers français par Racine le père. Elle tressaille, fronce les sourcils, lève et abaisse les mains, sans but déterminé, comme un homme qui se noie ; les yeux jetteront des lueurs verdàtres. Lisez-lui la Prière pour-tous, de Victor Hugo. Les effets sont diamétralement opposés. Le genre d’électricité n’est plus le même. Elle rit aux éclats, elle en demande davantage. De Hugo, il ne restera que les poésies sur les enfants, où se trouve beaucoup de mauvais."

function draw() {
  var phrase = generateSequence(input)
  background(255)
  textSize(20)
  text(phrase, 50, 200)
  Parole.speak(phrase)
}

function generateSequence(input) {
  var markovChain = markovChainGenerator(input)
  const words = Object.keys(markovChain)
  var result = ""
  for (var i = 0; i < 10; i++) {
      var seed = Math.floor(Math.random() * words.length)
      var firstWord = words[seed]
      result += firstWord + ' ';
      newWord = markovChain[firstWord][Math.floor(Math.random() * markovChain[firstWord].length)]
      firstWord = newWord;
  }


  return result;

}

function markovChainGenerator(text) {
  const textArr = text.split(' ')
  const markovChain = {};
  for (let i = 0; i < textArr.length; i++) {
      let word = textArr[i].toLowerCase()
      if (!markovChain[word]) {
          markovChain[word] = []
      }
      if (textArr[i + 1]) {
          markovChain[word].push(textArr[i + 1].toLowerCase());
      }
  }
  return markovChain
}
