// Emscripten wrapper

#include <string>
#include "./woff2/woff2_enc.h"

using std::string;

extern "C"
{

  char * TTFToWOFF2(char * input, int length, int * outputLength) {

    const uint8_t* input_data = reinterpret_cast<const uint8_t*>(input);
    size_t output_size = woff2::MaxWOFF2CompressedSize(input_data, length);
    string output(output_size, 0);
    uint8_t* output_data = reinterpret_cast<uint8_t*>(&output[0]);


    if (woff2::ConvertTTFToWOFF2(input_data, length,
                                  output_data, &output_size)) {
      output.resize(output_size);
    }

    *outputLength = output.length();
    char finalOutput[output.length() + 1];
    strcpy(finalOutput, output.c_str());

    return &output[0];
  }

}
