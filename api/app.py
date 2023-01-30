from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import cohere

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

co = cohere.Client('mGClGZitOktIGTpSQWKANZdv2lVOl4CmjkGYsHOP') # This is your trial API key

@app.route('/', methods=['GET']) #this is going to be the default site path
def hello_world():
    return "<p>Hello, World!</p>"

@app.errorhandler(404) #this if they use some link that doesn't exist
def page_not_found(e):
	return "<h1>404</h1><p>The resource could not be found.</p>", 404

@app.route('/api', methods=['GET'])
@cross_origin()
def actualStuff():
    query_parameters = request.args
    search = query_parameters.get('search')
    print(search)
    response = co.generate(
      model='medium',
      prompt=f"""
      Notes: A programming environment is the collection of tools used in the development of
      software. This collection may consist of only a file system, a text editor, a linker, and
      a compiler. Or it may include a large collection of integrated tools, each accessed
      through a uniform user interface. In the latter case, the development and mainte-
      nance of software is greatly enhanced. Therefore, the characteristics of a program-
      ming language are not the only measure of the software development capability of
      a system. We now briefly describe several programming environments.
      UNIX is an older programming environment, first distributed in the middle
      1970s, built around a portable multiprogramming operating system. It provides a
      wide array of powerful support tools for software production and maintenance in
      a variety of languages. In the past, the most important feature absent from UNIX
      was a uniform interface among its tools. This made it more difficult to learn and
      to use. However, UNIX is now often used through a graphical user interface
      (GUI) that runs on top of UNIX. Examples of UNIX GUIs are the Solaris Com-
      mon Desktop Environment (CDE), GNOME, and KDE. These GUIs make the
      interface to UNIX appear similar to that of Windows and Macintosh systems.
      Borland JBuilder is a programming environment that provides an inte-
      grated compiler, editor, debugger, and file system for Java development, where
      all four are accessed through a graphical interface. JBuilder is a complex and
      powerful system for creating Java software.
      Microsoft Visual Studio .NET is a relatively recent step in the evolution
      of software development environments. It is a large and elaborate collection
      of software development tools, all used through a windowed interface. This
      system can be used to develop software in any one of the five .NET languages:
      C#, Visual BASIC .NET, JScript (Microsoft’s version of JavaScript), F# (a func-
      tional language), and C++/CLI.
      NetBeans is a development environment that is primarily used for Java
      application development but also supports JavaScript, Ruby, and PHP. Both
      Visual Studio and NetBeans are more than development environments—they
      are also frameworks, which means they actually provide common parts of the
      code of the application.

      Summary: A programming environment is a collection of tools used in software development. One may include a file system, text editor, linker, compiler, or even another large collection of integrated tools.

      Main Points:
      - A programming environment is the collection of tools used in the development of software.
      - This collection may consist of only a file system, a text editor, a linker, and a compiler.
      - Or it may include a large collection of integrated tools, each accessed through a uniform user interface.
      - The characteristics of a programming language are not the only measure of the software development capability of a system.
      --
      Notes: The two main types of nucleic acids are deoxyribonucleic acid (DNA) and ribonucleic acid (RNA). DNA is the genetic material in
      all living organisms, ranging from single-celled bacteria to multicellular mammals. It is in the nucleus of eukaryotes and in the
      organelles, chloroplasts, and mitochondria. In prokaryotes, the DNA is not enclosed in a membranous envelope.
      The cell's entire genetic content is its genome, and the study of genomes is genomics. In eukaryotic cells but not in prokaryotes,
      DNA forms a complex with histone proteins to form chromatin, the substance of eukaryotic chromosomes. A chromosome may
      contain tens of thousands of genes. Many genes contain the information to make protein products. Other genes code for RNA
      products. DNA controls all of the cellular activities by turning the genes “on” or “off.”
      The other type of nucleic acid, RNA, is mostly involved in protein synthesis. The DNA molecules never leave the nucleus but
      instead use an intermediary to communicate with the rest of the cell. This intermediary is the messenger RNA (mRNA). Other
      types of RNA—like rRNA, tRNA, and microRNA—are involved in protein synthesis and its regulation.
      DNA and RNA are comprised of monomers that scientists call nucleotides. The nucleotides combine with each other to form a
      polynucleotide, DNA or RNA. Three components comprise each nucleotide: a nitrogenous base, a pentose (five-carbon) sugar,
      and a phosphate group.

      Summary: The two main types of nucleic acids are DNA (deoxyribonucleic acid) and RNA (ribonucleic acid). DNA makes up the genetic material in all living organisms while RNA is mostly involved in protein synthesis, acting as a communicator between the DNA in the nucleus and the rest of the cell.

      Main Points:
      - The two main types of nucleic acids are deoxyribonucleic acid (DNA) and ribonucleic acid (RNA).
      - DNA is the genetic material in all living organisms, ranging from single-celled bacteria to multicellular mammals.
      - DNA controls all of the cellular activities by turning the genes “on” or “off.”
      - The other type of nucleic acid, RNA, is mostly involved in protein synthesis.
      - The DNA molecules never leave the nucleus but instead use an intermediary to communicate with the rest of the cell.
      - DNA and RNA are comprised of monomers that scientists call nucleotides.
      --
      Notes: {search}

      Summary:
    """,
      max_tokens=300,
      temperature=0.7,
      k=0,
      p=0.75,
      frequency_penalty=0,
      presence_penalty=0,
      stop_sequences=[],
      return_likelihoods='NONE')
    print('Prediction: {}'.format(response.generations[0].text))
    return jsonify(response.generations[0].text)

if __name__ == "__main__":
	app.run(debug=True)