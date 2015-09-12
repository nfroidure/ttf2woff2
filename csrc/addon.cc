#include <node.h>
#include <node_buffer.h>
#include <string.h>
#include <stdio.h>
#include "./woff2/woff2_enc.h"

using namespace v8;

void Convert(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  // Checking arguments
  if (args.Length() < 1) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong number of arguments")));
    return;
  }

  if (!args[0]->IsObject()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Not an object")));
    return;
  }

  // Read the given buffer
  Local<Object> inputBuffer = args[0]->ToObject();

  if (!node::Buffer::HasInstance(inputBuffer)) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "First arg should be a Buffer")));
    return;
  }

  size_t input_length = node::Buffer::Length(inputBuffer);
  char* input_data = static_cast<char*>(
    node::Buffer::Data(inputBuffer)
  );

  // Determine the maximum needed length
  size_t max_output_length = woff2::MaxWOFF2CompressedSize(
    reinterpret_cast<const uint8_t*>(input_data), input_length);
  size_t actual_output_length = max_output_length;

  char* output_data[max_output_length];

  // Create the Woff2 font
  if (!woff2::ConvertTTFToWOFF2(
    reinterpret_cast<const uint8_t*>(input_data), input_length,
    reinterpret_cast<uint8_t*>(output_data), &actual_output_length
  )) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Could not convert the given font.")));
    return;
  }

  Local<Object> outputBuffer;
  if (!node::Buffer::Copy(
    isolate,
    reinterpret_cast<const char*>(output_data),
    actual_output_length
  ).ToLocal(&outputBuffer)) {
    args.GetReturnValue().Set(Local<Object>());
    return;
  }

  args.GetReturnValue().Set(outputBuffer);
}

void Init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "convert", Convert);
}

NODE_MODULE(addon, Init)
