/**
 * VexFlow - Basic Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 *
 */

Vex.Flow.Test.Articulation = {}

Vex.Flow.Test.Articulation.Start = function() {
  module("Stave");
  Vex.Flow.Test.Articulation.runTest("Articulation - Staccato/Staccatissimo (Canvas)",
    "a.","av", Vex.Flow.Test.Articulation.drawArticulations);
  Vex.Flow.Test.Articulation.runRaphaelTest("Articulation - Staccato/Staccatissimo (Raphael)",
    "a.","av", Vex.Flow.Test.Articulation.drawArticulations);
  Vex.Flow.Test.Articulation.runTest("Articulation - Accent/Tenuto (Canvas)",
    "a>","a-", Vex.Flow.Test.Articulation.drawArticulations);
  Vex.Flow.Test.Articulation.runRaphaelTest("Articulation - Accent/Tenuto (Raphael)",
    "a>","a-", Vex.Flow.Test.Articulation.drawArticulations);
  Vex.Flow.Test.Articulation.runTest("Articulation - Marcato/L.H. Pizzicato (Canvas)",
    "a^","a+", Vex.Flow.Test.Articulation.drawArticulations);
  Vex.Flow.Test.Articulation.runRaphaelTest("Articulation - Marcato/L.H. Pizzicato (Raphael)",
    "a^","a+", Vex.Flow.Test.Articulation.drawArticulations);
  Vex.Flow.Test.Articulation.runTest("Articulation - Snap Pizzicato/Fermata (Canvas)",
    "ao","ao", Vex.Flow.Test.Articulation.drawArticulations);
  Vex.Flow.Test.Articulation.runRaphaelTest("Articulation - Snap Pizzicato/Fermata (Raphael)",
    "ao","ao", Vex.Flow.Test.Articulation.drawArticulations);
  Vex.Flow.Test.Articulation.runTest("Articulation - Up-stroke/Down-Stroke (Canvas)",
    "a|","am", Vex.Flow.Test.Articulation.drawArticulations);
  Vex.Flow.Test.Articulation.runRaphaelTest("Articulation - Up-stroke/Down-Stroke (Raphael)",
    "a|","am", Vex.Flow.Test.Articulation.drawArticulations);
  Vex.Flow.Test.Articulation.runTest("Articulation - Fermata Above/Below (Canvas)",
    "a@a","a@u",Vex.Flow.Test.Articulation.drawFermata);
  Vex.Flow.Test.Articulation.runRaphaelTest("Articulation - Fermata Above/Below (Raphael)",
    "a@a","a@u",Vex.Flow.Test.Articulation.drawFermata);
  Vex.Flow.Test.Articulation.runTest("Articulation - Inline/Multiple (Canvas)",
    "a.","a.", Vex.Flow.Test.Articulation.drawArticulations2);
  Vex.Flow.Test.Articulation.runRaphaelTest("Articulation - Inline/Multiple (Raphael)",
    "a.","a.", Vex.Flow.Test.Articulation.drawArticulations2);
}

Vex.Flow.Test.Articulation.runTest = function(name, sym1, sym2, func, params) {
  test(name, function() {
      var test_canvas_sel = "canvas_" + Vex.Flow.Test.genID();
      Vex.Flow.Test.createTestCanvas(test_canvas_sel, name);
      func({ canvas_sel: test_canvas_sel, params: params },
        Vex.Flow.Renderer.getCanvasContext, sym1, sym2);
    });
}
Vex.Flow.Test.Articulation.runRaphaelTest = function(name, sym1, sym2, func, params) {
  test(name, function() {
      var test_canvas_sel = "canvas_" + Vex.Flow.Test.genID();
      Vex.Flow.Test.createTestRaphael(test_canvas_sel, name);
      func({ canvas_sel: test_canvas_sel, params: params },
        Vex.Flow.Renderer.getRaphaelContext, sym1, sym2);
    });
}

Vex.Flow.Test.Articulation.drawArticulations = function(options, contextBuilder, sym1, sym2) {
  expect(0);

  // Get the rendering context
  var ctx = contextBuilder(options.canvas_sel, 625, 195);

  // bar 1
  var staveBar1 = new Vex.Flow.Stave(10, 30, 125);
  staveBar1.setContext(ctx).draw();
  var notesBar1 = [
    new Vex.Flow.StaveNote({ keys: ["a/3"], duration: "q", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q", stem_direction: 1 })
  ];
  notesBar1[0].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(4));
  notesBar1[1].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(4));
  notesBar1[2].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(3));
  notesBar1[3].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(3));

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);

  // bar 2 - juxtaposing second bar next to first bar
  var staveBar2 = new Vex.Flow.Stave(staveBar1.width + staveBar1.x, staveBar1.y, 125);
  staveBar2.setEndBarType(Vex.Flow.Barline.type.DOUBLE);
  staveBar2.setContext(ctx).draw();

  var notesBar2 = [
    new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "q", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["a/5"], duration: "q", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "q", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["a/5"], duration: "q", stem_direction: -1 })
  ];
  notesBar2[0].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(3));
  notesBar2[1].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(3));
  notesBar2[2].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(4));
  notesBar2[3].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(4));

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar2, notesBar2);

  // bar 3 - juxtaposing second bar next to first bar
    var staveBar3 = new Vex.Flow.Stave(staveBar2.width + staveBar2.x, staveBar2.y, 125);
  staveBar3.setContext(ctx).draw();

  var notesBar3 = [
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q", stem_direction: 1 })
  ];
  notesBar3[0].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(4));
  notesBar3[1].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(4));
  notesBar3[2].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(3));
  notesBar3[3].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(3));

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar3, notesBar3);
  // bar 4 - juxtaposing second bar next to first bar
  var staveBar4 = new Vex.Flow.Stave(staveBar3.width + staveBar3.x, staveBar3.y, 125);
  staveBar4.setEndBarType(Vex.Flow.Barline.type.END);
  staveBar4.setContext(ctx).draw();

  var notesBar4 = [
    new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "q", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["a/5"], duration: "q", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "q", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["a/5"], duration: "q", stem_direction: -1 })
  ];
  notesBar4[0].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(3));
  notesBar4[1].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(3));
  notesBar4[2].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(4));
  notesBar4[3].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(4));

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar4, notesBar4);
}

Vex.Flow.Test.Articulation.drawFermata = function(options, contextBuilder, sym1, sym2) {
  expect(0);

  // Get the rendering context
  var ctx = contextBuilder(options.canvas_sel, 400, 200);

  // bar 1
  var staveBar1 = new Vex.Flow.Stave(50, 30, 150);
  staveBar1.setContext(ctx).draw();
  var notesBar1 = [
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q", stem_direction: -1 })
  ];
  notesBar1[0].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(3));
  notesBar1[1].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(3));
  notesBar1[2].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(4));
  notesBar1[3].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(4));

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);

  // bar 2 - juxtaposing second bar next to first bar
  var staveBar2 = new Vex.Flow.Stave(staveBar1.width + staveBar1.x, staveBar1.y, 150);
  staveBar2.setEndBarType(Vex.Flow.Barline.type.DOUBLE);
  staveBar2.setContext(ctx).draw();

  var notesBar2 = [
    new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "q", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["a/5"], duration: "q", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "q", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["a/5"], duration: "q", stem_direction: -1 })
  ];
  notesBar2[0].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(3));
  notesBar2[1].addArticulation(0, new Vex.Flow.Articulation(sym1).setPosition(3));
  notesBar2[2].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(4));
  notesBar2[3].addArticulation(0, new Vex.Flow.Articulation(sym2).setPosition(4));

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar2, notesBar2);
}

Vex.Flow.Test.Articulation.drawArticulations2 = function(options, contextBuilder, sym1, sym2) {
  expect(0);

  // Get the rendering context
  var ctx = contextBuilder(options.canvas_sel, 725, 200);

  // bar 1
  var staveBar1 = new Vex.Flow.Stave(10, 30, 250);
  staveBar1.setContext(ctx).draw();
  var notesBar1 = [
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["e/5"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["f/5"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["g/5"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["a/5"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["b/5"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["c/6"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["d/6"], duration: "16", stem_direction: -1 })
  ];
  for(var i=0; i<16; i++){
    notesBar1[i].addArticulation(0, new Vex.Flow.Articulation("a.").setPosition(4));
    notesBar1[i].addArticulation(0, new Vex.Flow.Articulation("a>").setPosition(4));
    
    if(i === 15)
      notesBar1[i].addArticulation(0, new Vex.Flow.Articulation("a@u").setPosition(4));
  }

  var beam1 = new Vex.Flow.Beam(notesBar1.slice(0,8));
  var beam2 = new Vex.Flow.Beam(notesBar1.slice(8,16));
  
  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);
  beam1.setContext(ctx).draw();
  beam2.setContext(ctx).draw();

  // bar 2 - juxtaposing second bar next to first bar
  var staveBar2 = new Vex.Flow.Stave(staveBar1.width + staveBar1.x, staveBar1.y, 250);
  staveBar2.setContext(ctx).draw();
  var notesBar2 = [
    new Vex.Flow.StaveNote({ keys: ["f/3"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["g/3"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["a/3"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["b/3"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "16", stem_direction: 1 }),
    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["e/5"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["f/5"], duration: "16", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["g/5"], duration: "16", stem_direction: -1 })
  ];
  for(i=0; i<16; i++){
    notesBar2[i].addArticulation(0, new Vex.Flow.Articulation("a-").setPosition(3));
    notesBar2[i].addArticulation(0, new Vex.Flow.Articulation("a^").setPosition(3));
    
    if(i === 15)
      notesBar2[i].addArticulation(0, new Vex.Flow.Articulation("a@u").setPosition(4));
  }

  var beam3 = new Vex.Flow.Beam(notesBar2.slice(0,8));
  var beam4 = new Vex.Flow.Beam(notesBar2.slice(8,16));
  
  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar2, notesBar2);
  beam3.setContext(ctx).draw();
  beam4.setContext(ctx).draw();

  // bar 3 - juxtaposing second bar next to first bar
  var staveBar3 = new Vex.Flow.Stave(staveBar2.width + staveBar2.x, staveBar2.y, 75);
  staveBar3.setContext(ctx).draw();

  var notesBar3 = [
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "w", stem_direction: 1 })
  ];
  notesBar3[0].addArticulation(0, new Vex.Flow.Articulation("a-").setPosition(3));
  notesBar3[0].addArticulation(0, new Vex.Flow.Articulation("a>").setPosition(3));
  notesBar3[0].addArticulation(0, new Vex.Flow.Articulation("a@a").setPosition(3));

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar3, notesBar3);
  // bar 4 - juxtaposing second bar next to first bar
  var staveBar4 = new Vex.Flow.Stave(staveBar3.width + staveBar3.x, staveBar3.y, 125);
  staveBar4.setEndBarType(Vex.Flow.Barline.type.END);
  staveBar4.setContext(ctx).draw();

  var notesBar4 = [
    new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "q", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["a/5"], duration: "q", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "q", stem_direction: -1 }),
    new Vex.Flow.StaveNote({ keys: ["a/5"], duration: "q", stem_direction: -1 })
  ];
  for(i=0; i<4; i++){
    var position1 = 3;
    var position2 = 4;
    if(i > 1){
      position1 = 4;
      position2 = 3;
    }
    notesBar4[i].addArticulation(0, new Vex.Flow.Articulation("a-").setPosition(position1));
  }

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar4, notesBar4);
}