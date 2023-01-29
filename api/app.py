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
      model='xlarge',
      prompt=f"""Notes: A programming environment is the collection of tools used in the development of
    \nsoftware. This collection may consist of only a file system, a text editor, a linker, and
    \na compiler. Or it may include a large collection of integrated tools, each accessed
    \nthrough a uniform user interface. In the latter case, the development and mainte-
    \nnance of software is greatly enhanced. Therefore, the characteristics of a program-
    \nming language are not the only measure of the software development capability of
    \na system. We now briefly describe several programming environments.
    \nUNIX is an older programming environment, first distributed in the middle
    \n1970s, built around a portable multiprogramming operating system. It provides a
    \nwide array of powerful support tools for software production and maintenance in
    \na variety of languages. In the past, the most important feature absent from UNIX
    \nwas a uniform interface among its tools. This made it more difficult to learn and
    \nto use. However, UNIX is now often used through a graphical user interface
    \n(GUI) that runs on top of UNIX. Examples of UNIX GUIs are the Solaris Com-
    \nmon Desktop Environment (CDE), GNOME, and KDE. These GUIs make the
    \ninterface to UNIX appear similar to that of Windows and Macintosh systems.
    \nBorland JBuilder is a programming environment that provides an inte-
    \ngrated compiler, editor, debugger, and file system for Java development, where
    \nall four are accessed through a graphical interface. JBuilder is a complex and
    \npowerful system for creating Java software.
    \nMicrosoft Visual Studio .NET is a relatively recent step in the evolution
    \nof software development environments. It is a large and elaborate collection
    \nof software development tools, all used through a windowed interface. This
    \nsystem can be used to develop software in any one of the five .NET languages:
    \nC#, Visual BASIC .NET, JScript (Microsoft’s version of JavaScript), F# (a func-
    \ntional language), and C++/CLI.
    \nNetBeans is a development environment that is primarily used for Java
    \napplication development but also supports JavaScript, Ruby, and PHP. Both
    \nVisual Studio and NetBeans are more than development environments—they
    \nare also frameworks, which means they actually provide common parts of the
    \ncode of the application.
    \n
    \nSummary: A programming environment is a collection of tools used in software development. One may include a file system, text editor, linker, compiler, or even another large collection of integrated tools. Some examples are: UNIX, Borland JBuilder, Microsoft Visual Studio .NET, and NetBeans.
    \n
    \nMain Points:
    \n- A programming environment is the collection of tools used in the development of software.
    \n- This collection may consist of only a file system, a text editor, a linker, and a compiler.
    \n- Or it may include a large collection of integrated tools, each accessed through a uniform user interface.
    \n- The characteristics of a programming language are not the only measure of the software development capability of a system.
    \n--
    \nNotes: The two main types of nucleic acids are deoxyribonucleic acid (DNA) and ribonucleic acid (RNA). DNA is the genetic material in
    \nall living organisms, ranging from single-celled bacteria to multicellular mammals. It is in the nucleus of eukaryotes and in the
    \norganelles, chloroplasts, and mitochondria. In prokaryotes, the DNA is not enclosed in a membranous envelope.
    \nThe cell\'s entire genetic content is its genome, and the study of genomes is genomics. In eukaryotic cells but not in prokaryotes,
    \nDNA forms a complex with histone proteins to form chromatin, the substance of eukaryotic chromosomes. A chromosome may
    \ncontain tens of thousands of genes. Many genes contain the information to make protein products. Other genes code for RNA
    \nproducts. DNA controls all of the cellular activities by turning the genes “on” or “off.”
    \nThe other type of nucleic acid, RNA, is mostly involved in protein synthesis. The DNA molecules never leave the nucleus but
    \ninstead use an intermediary to communicate with the rest of the cell. This intermediary is the messenger RNA (mRNA). Other
    \ntypes of RNA—like rRNA, tRNA, and microRNA—are involved in protein synthesis and its regulation.
    \nDNA and RNA are comprised of monomers that scientists call nucleotides. The nucleotides combine with each other to form a
    \npolynucleotide, DNA or RNA. Three components comprise each nucleotide: a nitrogenous base, a pentose (five-carbon) sugar,
    \nand a phosphate group. Each nitrogenous base in a nucleotide is attached to a sugar molecule, which is attached to
    \none or more phosphate groups.
    \n
    \nSummary: The two main types of nucleic acids are DNA (deoxyribonucleic acid) and RNA (ribonucleic acid). DNA makes up the genetic material in all living organisms while RNA is mostly involved in protein synthesis, acting as a communicator between the DNA in the nucleus and the rest of the cell.
    \n
    \nMain Points:
    \n- The two main types of nucleic acids are deoxyribonucleic acid (DNA) and ribonucleic acid (RNA).
    \n- DNA is the genetic material in all living organisms, ranging from single-celled bacteria to multicellular mammals.
    \n- DNA controls all of the cellular activities by turning the genes “on” or “off.”
    \n- The other type of nucleic acid, RNA, is mostly involved in protein synthesis.
    \n- The DNA molecules never leave the nucleus but instead use an intermediary to communicate with the rest of the cell.
    \n- DNA and RNA are comprised of monomers that scientists call nucleotides.
    \n--
    \nNotes: {search}.
    \n
    \nSummary:""",
      max_tokens=300,
      temperature=0.7,
      k=0,
      p=0.75,
      frequency_penalty=0,
      presence_penalty=0,
      stop_sequences=[],
      return_likelihoods='NONE')
    print('Prediction: {}'.format(response.generations[0].text))
    return jsonify(response.generations[0].text.split("--")[0])

if __name__ == "__main__":
	app.run(debug=True)