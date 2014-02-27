int width = $(window).innerWidth();
int height = $(window).innerHeight();

$(window).resize(function(){
    width = $(window).innerWidth();
    height = $(window).innerHeight();
    setup();
});

//int width = 600;
//int height = 600;

int right_curve_top_x = 42*width/50;
int right_curve_top_y = 21*height/60;
int right_curve_bottom_x = 44*width/50;
int right_curve_bottom_y = 24*height/60;

int x_interval = width/60;
int y_interval = height/60;


int[] right_curve_top_xs = new int[20];
int[] right_curve_top_ys = new int[20];

int[] right_curve_bottom_xs = new int[20];
int[] right_curve_bottom_ys = new int[20];

void setup(){
    for(int i = 0; i < 10; i++){
        right_curve_top_xs[i] = right_curve_top_x + x_interval * i;
        right_curve_top_ys[i] = right_curve_top_y + y_interval * i;
        right_curve_bottom_xs[i] = right_curve_bottom_x + x_interval * i;
        right_curve_bottom_ys[i] = right_curve_bottom_y + y_interval * i;

        right_curve_bottom_ys[19-i] = right_curve_bottom_ys[i];
        right_curve_bottom_xs[19-i] = right_curve_bottom_xs[i];
        right_curve_top_ys[19-i] = right_curve_top_ys[i];
        right_curve_top_xs[19-i] = right_curve_top_xs[i];
    }
    size(width, height);  
    //size($(window).innerWidth(), $(window).innerHeight());

    noStroke();
}

void drawFace(){
    int ears_y = 11*height/50;
    int left_ear_x = 22*width/50;
    int right_ear_x = 38*width/50;
    int ear_width = width/6;
    int ear_height = height/6;

    int head_y = height/5 + height/6;
    int head_width = 8*ear_width/3;
    int head_x = (6*width/5) / 2;
    int head_height = 5*height/12;

    int left_eye_x = 13*width/25;
    int right_eye_x = 17*width/25;
    int eye_y = head_y - height/20;
    int eye_width = width/7;
    int eye_height = 3*height/14;

    int eyeball_width = width/9;
    int eyeball_height = height/7;
    int eyeball_y = eye_y+height/24;

    int inner_eye_width = eyeball_width/2;
    int inner_eye_height = 7*eyeball_height/12;
    int inner_eye_y = eyeball_y-height/60;
    int left_inner_eye_x = left_eye_x-width/60;
    int right_inner_eye_x = right_eye_x-width/60;

    int small_eye_width = inner_eye_width/2; 
    int small_eye_height = 17*small_eye_width/15;
    int small_eye_y = eyeball_y+height/30;
    int left_small_eye_x = left_eye_x+width/40;
    int right_small_eye_x = right_eye_x+width/40;

    int nose_top_left_x = left_small_eye_x + width/19;
    int nose_top_right_x = nose_top_left_x + width/100;
    int nose_top_y = small_eye_y;
    int nose_bottom_left_x = nose_top_left_x - width/35;
    int nose_bottom_right_x = nose_top_right_x + width/35;
    int nose_bottom_y = nose_top_y + height/20;

    int line_start_y = nose_bottom_y;
    int line_start_x = (nose_bottom_left_x + nose_bottom_right_x) / 2;
    int line_end_y = line_start_y + height/50;
    int line_end_x = line_start_x;

    int branch_left_end_y = line_end_y + height/90;
    int branch_left_end_x = line_end_x - height/40;

    int branch_right_end_y = line_end_y + height/90;
    int branch_right_end_x = line_end_x + height/40;

    int cheek_y = nose_bottom_y;
    int left_cheek_x = (left_ear_x + left_eye_x) / 2;
    int cheek_width = width/10;
    int cheek_height = height/10;
    int right_cheek_x = (right_ear_x + right_eye_x) / 2;

    //draw ears
    fill(0);
    arc(left_ear_x, ears_y, ear_width, ear_height, 1.25*HALF_PI, 2.5*PI, OPEN);
    arc(right_ear_x, ears_y, ear_width, ear_height, 0.5*PI, 2.375*PI, OPEN);

    //head
    fill(255);
    ellipse(head_x, head_y, head_width, head_height);

    //cheeks should be rosy
    fill(color(240,165,153));
    ellipse(left_cheek_x, cheek_y, cheek_width, cheek_height);
    ellipse(right_cheek_x, cheek_y, cheek_width, cheek_height);

    //round black eyeshadow
    fill(120);
    ellipse(left_eye_x, eye_y, eye_width, eye_height);
    ellipse(right_eye_x, eye_y, eye_width, eye_height);

    //round inner dark black eyes
    fill(0);
    ellipse(left_eye_x, eyeball_y, eyeball_width, eyeball_height);
    ellipse(right_eye_x, eyeball_y, eyeball_width, eyeball_height);

    //shine in white
    fill(245);
    ellipse(left_inner_eye_x, inner_eye_y, inner_eye_width, inner_eye_height);
    ellipse(right_inner_eye_x, inner_eye_y, inner_eye_width, inner_eye_height);
    fill(235);
    ellipse(left_small_eye_x, small_eye_y, small_eye_width, small_eye_height);
    ellipse(right_small_eye_x, small_eye_y, small_eye_width, small_eye_height);

    //nose and three triangle lines
    fill(0);
    quad(nose_top_left_x, nose_top_y, nose_top_right_x, nose_top_y,
        nose_bottom_right_x, nose_bottom_y, nose_bottom_left_x, nose_bottom_y);

    stroke(0);
    strokeWeight(3);
    line(line_start_x, line_start_y, line_end_x, line_end_y);
    line(line_end_x, line_end_y, branch_left_end_x, branch_left_end_y);
    line(line_end_x, line_end_y, branch_right_end_x, branch_right_end_y);

    //no stroke on the rest of the drawing
    noStroke();

}

void drawBody(){
    int animation_msec = 0; //(millis() % 2000) / 100; 
    //Processing.js doesn't allow this sort of animation drawing

    fill(0);
    //LEFTARM
    beginShape();
    curveVertex(24*width/50, 32*height/60);
    curveVertex(24*width/50, 32*height/60);
    curveVertex(12*width/50, 30*height/60);
    curveVertex(13*width/50, 34*height/60);
    curveVertex(22*width/50, 38*height/60);
    curveVertex(22*width/50, 38*height/60);
    endShape();

    //RIGHTARM
    beginShape();
    curveVertex(35*width/50, 33*height/60);
    curveVertex(35*width/50, 33*height/60);

    curveVertex(right_curve_top_xs[animation_msec], right_curve_top_ys[animation_msec]);
    curveVertex(right_curve_bottom_xs[animation_msec], right_curve_bottom_ys[animation_msec]);
    
    curveVertex(38*width/50, 20*height/30);
    curveVertex(38*width/50, 20*height/30);
    //curveVertex(32, 100);
    //curveVertex(32, 100);
    endShape();

    fill(252);
    ellipse(3*width/5, 22*height/30, 4*width/9, 14*height/30);
}

void drawGrass(){
    fill(color(35,240,60));
    int grass_x = 0;
    int grass_end_x = 0;
    int grass_y = 59*height/60;

    int heightg = 22*height/30;
    int height2 = 4*height/6;
    int heightreal = 0;

    boolean flag = false;

    while(grass_x < width){
        grass_end_x = grass_x + width/25;
        heightreal = height2;
        if(flag){
            heightreal = heightg;
        }
        flag = !flag;
        triangle(grass_x, grass_y, (grass_x + grass_end_x)/2,
           heightreal, grass_end_x, grass_y);

        grass_x = grass_end_x;
    }
    fill(color(150,150,80));
    rect(0, grass_y, width, grass_y);
}

void draw(){
    //clear(); Processing.js clears on draw
    background(color(50,122,250));
    drawFace();
    drawGrass();
    drawBody();
}