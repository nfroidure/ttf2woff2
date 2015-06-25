// Emscripten wrapper

#include <stdlib.h>
#include "./woff2/woff2_enc.h"

using std::string;

extern "C"
{

  char * convertTTFToWOFF2(char * input, int length, int * outputLength) {

    const uint8_t* input_data = reinterpret_cast<const uint8_t*>(input);
    size_t output_size = woff2::MaxWOFF2CompressedSize(input_data, length);

    uint8_t* output_data = reinterpret_cast<uint8_t*>(malloc(output_size));


    if (woff2::ConvertTTFToWOFF2(input_data, length,
                                  output_data, &output_size)) {
      //output.resize(output_size);
    }

    *outputLength = output_size;

    return (char *) output_data;
  }

  void freeTTFToWOFF2(char * output_data) {
    free(output_data);
  }

}
