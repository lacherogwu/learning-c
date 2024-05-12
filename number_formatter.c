#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]){
    if (argc != 3){
        printf("Usage: %s <file_name> <prefix>\n", argv[0]);
        exit(1);
    }

    char *fileName = argv[1];
    FILE *outputFile = fopen(fileName, "w");

    char *prefix = argv[2];

    char c = fgetc(stdin);

    char *chars = malloc(100);
    int index = 0;
    
    while (c != EOF){
        if(c == ' '){
            if(index > 0){
                chars[index] = '\0';
                fprintf(outputFile, "%s", prefix);
                for(int i = 0; i < index; i++){
                    fprintf(outputFile, "%c", chars[i]);
                }
                index = 0;
            }
            fprintf(outputFile, " ");
        } else {
            chars[index++] = c;
        }
        c = fgetc(stdin);
    }
    
    if(index > 0){
        chars[index] = '\0';
        fprintf(outputFile, "%s", prefix);
        for(int i = 0; i < index; i++){
            fprintf(outputFile, "%c", chars[i]);
        }
    }
    
    return 0;
}